import * as React from "react"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="About" />
      <h2>About</h2>
      <a href="#me">Me</a> | <a href="#goals">Goals</a> |{" "}
      <a href="#site">Site</a>
      <hr></hr>
      <p>
        I adopted the pattern of using my site's "pages" to summarize, and my
        blog entries to detail.
        <br />
        Gatsby pages are basically React, but the blog entries are generated
        from MD (Markdown). I can code HTML by hand, but MD is so much faster to
        write.
      </p>
      <h3 id="me">Me</h3>
      <p>
        I am a full stack web apps developer who has largely moved to being a
        DevOps engineer. I took some detours from software development into
        secondary school science and technology education. I enjoy educating and
        mentoring, and it was a good fit for raising five school age children. I
        also spent several years taking full time care of my children when my
        spouse's medical career became very demanding and we were stationed
        cross country with the National Health Service.
      </p>
      <p>
        My twins just graduated from high school and I'm ready to re-enter the
        market. I took advantage of my time off to explore technologies that I
        was too busy to explore while working full-time and my new employers
        will benefit from that.
      </p>
      <p>
        Details are available on my blog entry{" "}
        <a href="/edpike365-about">About EdPike365</a>.
      </p>
      <h3 id="goals">My Professional Strategic Goals</h3>
      <p>
        I have a blog entry about my{" "}
        <a href="/edpike365-professional-goals">professional goals</a>.
      </p>
      <p>Here they are in a nutshell:</p>
      <ul>
        Strategic Goals Re-enter DevOps Engineering. Focusing on:
        <ul>
          <li>DevSecOps: become more focused on security</li>
          <li>Cloud Engineer: multicloud, but AWS primary</li>
          <li>
            <a href="https://www.pulumi.com/what-is/what-is-infrastructure-as-software/">
              Infrastructure as Software
            </a>
            , <i>not</i> code.
          </li>
          <li>MLOps: ML, data pipelines</li>
          <li>
            Synthetic Biology Cloud Lab Automation: IOT, event driven
            architecture
          </li>
        </ul>
        Tactical Goals to support strategic goals:
        <ol>
          <li>Get job in AWS Shop, preferably consulting.</li>
          <li>
            Enhance Python skills. Use Python for most things. Use Go/Rust for
            performance, typically Lambdas.
          </li>
          <li>
            Kubernetes to support multicloud, which supports freedom from vendor
            lock. Kubernetes certs.
          </li>
          <li>
            Imrove Techs: Terraform, Ansible, Docker, Kubernetes, Python, Go,
            Django, FastAPI, Okta, AWS Lambda...{" "}
          </li>
        </ol>
      </ul>
      <h3 id="site">This Site's Technology</h3>
      <p>
        I wrote this site in <a href="https://www.gatsbyjs.com/">Gatsby</a>. I
        wanted to learn a lot about React, JAM Stack, CSS in JS, and NPM
        publishing.
        <br />I am documenting my work and what I learned in my{" "}
        <a href="/edpike365-customizations/">Site Customization Journal</a>.
      </p>{" "}
    </Layout>
  )
}

export default About
