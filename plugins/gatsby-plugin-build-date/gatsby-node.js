"use strict";

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest
}, {
  locale = "en_US",
  formattingOptions
}) => {

  console.log("build date options: " + JSON.stringify(formattingOptions))
    
  const dateTime = new Date();
  const dateTimeString = dateTime.toLocaleString(locale, formattingOptions);
  const dateBuiltData = {
    currentDate : dateTimeString
  }

  const nodeContent = JSON.stringify(dateBuiltData);
  console.log("nodeContent: " + nodeContent);

  const nodeMeta = {
    id: createNodeId(`current-build-date`),
    parent: null,
    children: [],
    internal: {
      type: `CurrentBuildDate`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(dateBuiltData)
    }
  };

  const dateBuiltNode = Object.assign({}, dateBuiltData, nodeMeta);

  actions.createNode(dateBuiltNode);

};