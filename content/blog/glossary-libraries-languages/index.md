---
title: Glossary of Biotech, ML and Datascience Libraries and Languages
date: "2021-12-27T22:12:03.284Z"
status: draft
author: EdPike365
tags:
  - edpike365
  - Glossary
  - DevOps
  - MLOps
---

## Useful Languages and Libraries

Gathered from following SynBio companies and from their help wanted ads.

### Languages <a name="languages"></a>

Trailing numbers are from job postings in Boston.

- Python (6,966)
- [R (936?)](https://www.r-project.org/)
- [Julia (73)](https://julialang.org/)
- [Go (271)](https://go.dev/): Kubernetes is written in it. Good for Lambdas.
- [Rust (211)](https://www.rust-lang.org/)
- [Scala (506)](https://www.scala-lang.org/): Functional JVM
- Java (4,450)
- JavaScript (3,620)
- TypeScript (667)

### Libraries <a name="libraries"></a>

- DevSecOps, BioScience and BioTech use Python a lot. Many apps are written in Python, including app servers. Many will need to be professionalized by software engineers. Trailing numbers indicated "job hits".

  - Scientific and Numeric Calculations
    - [NumPy (156)](https://numpy.org/): linear algebra. Matlab clone.
    - [SciPy (81)](https://scipy.org/): built on NumPy
    - [SciKits (178)](https://projects.scipy.org/scikits.html): SciPy Toolkits.
  - Data Analysis Libs
    - [Pandas (212)](https://pandas.pydata.org/): tubular data
  - Apps
    - [Jupyter Notebook (81)](https://jupyter.org/): See also JupyterLab. Prototype.
    - [PyCharm (26)](https://www.jetbrains.com/pycharm/): JetBrains IDE plus. Unit testing. Prod.
  - Other:
    - [MATLAB (1,063)](https://www.mathworks.com/products/matlab.html): The whole, expensive, enchilada.
    - [Django (236)](https://www.djangoproject.com/): python web app server
    - [Numba (16)](https://numba.pydata.org/): Python JIT compiler
    - [Kaggle (10)](https://www.kaggle.com/): Jupyter Notebooks online. ML competitions.
  - Machine Learning
    - [TensorFlow (388)](https://www.tensorflow.org/): see also TensorFlow.js, TensorFlow Lite
    - [Keras (117)](https://keras.io/): built on TF2
    - [PyTorch (331)](https://pytorch.org/): deep learning, and linear algebra. GPU accelerated.
    - [Scikit-Learn (177)](https://scikit-learn.org/stable/): built on NumPy, SciPy and matplotlib
  - App Data Visualization:
    - [Matplotlib (51)](https://matplotlib.org/)
    - [Seaborn (21)](https://seaborn.pydata.org/): Based on matplotlib

> Top ML/DL Libraries 2019-ish from [Kaggles](https://www.kaggle.com/[), in "[Deep Learning with Python](https://www.manning.com/books/deep-learning-with-python-second-edition?gclid=Cj0KCQiAlMCOBhCZARIsANLid6YjJoYPgdAU9IrC4WVpeBHU770B3jPj94qAlk6dVOpnY2DHEeDYbHYaAvGlEALw_wcB)" by Francois Chollet:
>
> - Deep Learning: Keras/TensorFlow, PyTorch
> - Classic Gradient Boost: Scikit-learn, [XGBoost](https://xgboost.readthedocs.io/en/stable/), [LightGBM](https://lightgbm.readthedocs.io/en/latest/)

- Genomics research requires moving large sequencer results around, securely,
  24x7, mining them and displaying the results.
  - ML Lifecycle:
    - [MLFlow (41)](https://mlflow.org/)
    - [Kedro (8)](https://kedro.readthedocs.io/en/stable/)
    - [Apache Airflow (93)](https://airflow.apache.org/): generic workflows
  - Batch/Stream Processing:
    - [Apache Spark (201)](https://spark.apache.org/): massive datasets, groups of rows
  - Parallel Processing:
    - [DASK (25)](https://dask.org/): CPU
    - [RAPIDS (22)](https://rapids.ai): GPU
  - Message Bus:
    - [Kafka (750)](https://kafka.apache.org/): (aka Amazon Kinesis) Row parsing, data cleansing
  - Warehouse: [Hive (318)](https://hive.apache.org/)
  - DB:
    - [Apache Druid (18)](https://druid.apache.org/): Column-oriented
    - [InfluxDB (0) ](https://www.influxdata.com/): time series. HTTP API
    - [Apache Arrow (14)](https://arrow.apache.org/): In memory columnar DB. HP analytics.
  - Search: [Elasticsearch (345)](https://www.elastic.co/what-is/elasticsearch)
  - Distributed Visualization:
    - [Kibana (84)](https://www.elastic.co/kibana/): Elastic stack dashboards.
    - [Grafana (135)](https://grafana.com/): Dashboards. Kibana fork.
    - [Graphite (0)](https://graphiteapp.org/): Predecessor to Grafana. Prometheus and Elasticsearch.
    - [CNCF Prometheus (0)](https://prometheus.io/): Time series (logs)

> ELK Stack: Elasticsearch, Logstash, Kibana, "owned" by elastic.co, traditionally used for log analysis.

- Infrastructure
  - Terraform (835)
  - CloudFormation (247)
  - Ansible (637)
  - Chef (?)
  - AWS (4,829)
  - GCP (321)
  - Linux (3,146)
  - [Kubernetes (1,668)](https://kubernetes.io/)
    - CKA (12), CKAD (6)
  - [Docker (1,805)](https://www.docker.com/)
  - DevOps (454)
  - SRE (225)
- Front End
  - Angular (844)
  - React (740)
  - React Native (135)
  - Next.js (75 - 301)
  - Vue (295)
  - Svelte (14)
  - Gatsby (13)
  - .net (1,002)
  - redux (288)
