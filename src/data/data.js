// ─────────────────────────────────────────────
//  DATA.JS — Edit your real content here
// ─────────────────────────────────────────────

export const personalInfo = {
  name: "Sajlendra Pandey",
  
  email: "sajlendrapandey2022@gmail.com",
  
  linkedin: "https://www.linkedin.com/in/sajlendra-pandey-37378627b/",
  
  github: "https://github.com/SAJLENDRAPANDEY",
  
  githubUsername: "SAJLENDRAPANDEY",
  
  leetcode: "https://leetcode.com/u/sajlendrapandey2024/",
  
  gfg: "https://www.geeksforgeeks.org/user/sajlendra_pandey_72/",
  blog: "https://yashutech.hashnode.dev/",
  location: "Gurgaon, Haryana, India",
  resumeLink: "/resume/resume.pdf",
  college: "MDU Rohtak",
  degree: "B.Tech CSE (Data Science)",
  year: "2023–2027",
  bio: [
    "Hi, I'm Sajlendra Pandey — a Data Science undergraduate driven by curiosity, problem-solving, and the power of data.",

  "I specialize in building end-to-end data products that combine analytics, machine learning, and modern web technologies. From forecasting business sales and creating interactive dashboards to developing AI-powered applications, I enjoy transforming ideas into scalable solutions.",

  "My technology stack includes Python, SQL, FastAPI, React, Power BI, Docker, Machine Learning, and Generative AI. I believe that great products are built by combining clean engineering with data-driven decision-making.",

  "As a GSSoC 2026 Campus Ambassador & Open Source Contributor, I actively collaborate on impactful projects while continuously learning new technologies and best practices.",

  "My goal is to become a Data Analyst or Machine Learning Engineer, building intelligent systems that help businesses make smarter decisions."
],
};

export const stats = [
  { num: "5+",   label: "Live Projects" },
  { num: "2+",   label: "Internships" },
  { num: "8+",   label: "Certifications" },
  { num: "300+", label: "GitHub Commits" },
];

export const skills = [
  {
    category: "Programming",
    items: [
      { name: "Python",      level: 92 },
      { name: "SQL",         level: 88 },
      { name: "JavaScript",  level: 75 },
      { name: "Java",        level: 65 },
    ],
  },
  {
    category: "Data Analytics",
    items: [
      { name: "Pandas / NumPy",       level: 90 },
      { name: "Power BI",             level: 85 },
      { name: "Excel",                level: 88 },
      { name: "Tableau",              level: 72 },
      { name: "Matplotlib / Seaborn", level: 82 },
    ],
  },
  {
    category: "Machine Learning",
    items: [
      { name: "Scikit-Learn",    level: 85 },
      { name: "XGBoost",         level: 78 },
      { name: "FastAPI",         level: 80 },
      { name: "LangChain",       level: 70 },
      { name: "Groq / LLM APIs", level: 75 },
    ],
  },
  {
    category: "Web & Databases",
    items: [
      { name: "React",      level: 80 },
      { name: "PostgreSQL", level: 78 },
      { name: "MySQL",      level: 82 },
      { name: "MongoDB",    level: 65 },
      { name: "Docker",     level: 60 },
    ],
  },
];

export const experiences = [
  {
    role: "Machine Learning Engineer Intern",
    company: "TechAI",
    date: "2026",
    period: "July 2026 – Present",
    type: "Internship",
    icon: "fa-brain",
    desc: "Building machine learning pipelines for data analysis and predictive modeling. Responsible for data cleaning, feature engineering, model training, performance evaluation, and creating REST APIs for model deployment using FastAPI while collaborating on analytics and AI-driven projects.",
    tags: [
    "Python",
    "Machine Learning",
    "Pandas",
    "Scikit-learn",
    "FastAPI",
    "SQL",
    "Git",
    "Data Analysis"]
  },
  {
    role: "Python Developer Intern",
    company: "CodSoft",
    date: "2024",
    period: "Jun 2024 – Aug 2024",
    type: "Internship",
    icon: "fa-code",
    desc: "Built Python automation scripts and mini-projects. Strengthened OOP fundamentals and scripting skills in a professional environment. Delivered 4 projects including a calculator, to-do app, and contact book.",
    tags: ["Python", "OOP", "Automation", "Git"],
  },
  {
    role: "Campus Ambassador & Contributor",
    company: "GirlScript Summer of Code 2026",
    date: "2026",
    period: "Mar 2026 – Present",
    type: "Open Source",
    icon: "fa-users",
    desc: "Promoting open-source culture on campus, onboarding new contributors, and actively contributing to GSSoC repositories. Organized 2 campus workshops on Git and open-source contribution workflows.",
    tags: ["Open Source", "Community", "Git", "Mentorship"],
  },
];

// ─────────────────────────────────────────────
//  PROJECTS — Full engineering case studies
// ─────────────────────────────────────────────

export const projects = [
  // ─── 1. Retail Sales Forecasting ───────────────────────────────────────
  {
    id: "retail-sales-forecasting",
    title: "Retail Sales Forecasting Platform",
    shortDesc: "End-to-end AI forecasting platform with FastAPI + React 18",
    desc: "End-to-end forecasting platform with Python/FastAPI backend (Groq/Llama 3.3, scikit-learn, XGBoost, SQLite) and React 18/Vite frontend. CI/CD via GitHub Actions, Dockerized, deployed on Render.",
    tech: ["React 18", "FastAPI", "XGBoost", "SQLite", "Docker", "Llama 3.3", "Render"],
    icon: "fa-chart-line",
    featured: true,
    // TODO: Replace with Sajlendra's actual GitHub repo URL
    github: "https://github.com/SAJLENDRAPANDEY/Retail-Sales-Forecasting-Platform",
    // TODO: Add Render/Vercel deployed URL when live
    live: "https://retails-sales-forecasting-platform.netlify.app/",

    category: "ML",
    // TODO: Add actual screenshots to /public/projects/retail-sales-forecasting/
    // Recommended size: 1280×800px, JPG/PNG/WebP
    // Files needed: dashboard.png, forecast.png, charts.png, architecture.png
    images: [
      { src: "/projects/retail-sales-forecasting/dashboard.png",    alt: "Retail Sales Forecasting — main dashboard view",          label: "Dashboard" },
      { src: "/projects/retail-sales-forecasting/forecast.png",     alt: "Retail Sales Forecasting — forecast prediction chart",    label: "Prediction" },
      { src: "/projects/retail-sales-forecasting/charts.png",       alt: "Retail Sales Forecasting — Recharts analytics view",      label: "Charts" },
      { src: "/projects/retail-sales-forecasting/architecture.png", alt: "Retail Sales Forecasting — system architecture diagram",  label: "Architecture" },
    ],
    details: {
      businessProblem:
        "Retail businesses face inventory and revenue planning challenges caused by unpredictable demand. Without reliable sales forecasts, teams rely on intuition or lagged reports, leading to overstock and missed demand signals. This platform provides a data-driven forecasting layer with a natural-language interface so non-technical stakeholders can query insights directly.",

      solution:
        "Built a full-stack platform where users upload historical sales CSVs, select a forecasting model (XGBoost or scikit-learn Linear Regression), and receive a time-series forecast with interactive charts. An LLM-powered query interface (Groq/Llama 3.3) allows plain-English questions over the uploaded data. All forecasts are persisted in SQLite and accessible via a React dashboard.",

      architecture: [
        { layer: "Frontend",  tech: "React 18 + Vite",       role: "User uploads CSV, views charts, queries LLM" },
        { layer: "API",       tech: "FastAPI (Python)",       role: "Handles upload, triggers ML pipeline, serves predictions" },
        { layer: "ML Engine", tech: "XGBoost / scikit-learn", role: "Trains on uploaded data, returns forecast array" },
        { layer: "LLM Layer", tech: "Groq / Llama 3.3-70B",  role: "Parses natural-language queries, returns insight text" },
        { layer: "Database",  tech: "SQLite",                 role: "Stores uploaded datasets, forecast results, user sessions" },
        { layer: "DevOps",    tech: "Docker + GitHub Actions", role: "Containerised build; CI runs tests on every push" },
        { layer: "Hosting",   tech: "Render",                 role: "Backend container + static frontend served via CDN" },
      ],

      workflow: [
        "User uploads a CSV file containing historical sales data (date, product, quantity, revenue).",
        "FastAPI validates the schema, stores the file, and triggers the ML pipeline.",
        "XGBoost model trains on the user's data and generates a forecast for the selected horizon (7 / 30 / 90 days).",
        "Forecast results are stored in SQLite and returned to the React frontend as JSON.",
        "Recharts renders interactive line and bar charts with hover tooltips.",
        "User can type a natural-language question (e.g. 'Which product had the highest growth?'); the LLM layer answers using the dataset context.",
      ],

      apiFlow: [
        { method: "POST", endpoint: "/api/upload",        desc: "Accepts multipart CSV, validates schema, returns dataset_id" },
        { method: "POST", endpoint: "/api/forecast",      desc: "Accepts dataset_id + horizon, runs XGBoost, returns forecast JSON" },
        { method: "GET",  endpoint: "/api/forecast/{id}", desc: "Retrieves stored forecast by ID" },
        { method: "POST", endpoint: "/api/query",         desc: "Accepts natural-language question + dataset_id, returns LLM answer" },
        { method: "GET",  endpoint: "/api/datasets",      desc: "Lists all uploaded datasets for the current session" },
      ],

      database: {
        tables: [
          { name: "datasets",  columns: "id, filename, uploaded_at, row_count, schema_json" },
          { name: "forecasts", columns: "id, dataset_id, horizon_days, model_used, results_json, created_at" },
          { name: "queries",   columns: "id, dataset_id, question, answer, created_at" },
        ],
        notes: "SQLite chosen for zero-config deployment on Render free tier. Can be swapped to PostgreSQL via SQLAlchemy ORM with no application-layer changes.",
      },

      folderStructure: `retail-sales-forecasting/
├── frontend/
│   ├── src/
│   │   ├── components/   # Chart, Upload, QueryBox, Sidebar
│   │   ├── pages/        # Dashboard, Forecast, History
│   │   └── services/     # api.js (fetch wrappers)
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── routers/      # upload.py, forecast.py, query.py
│   │   ├── models/       # SQLAlchemy ORM models
│   │   ├── ml/           # xgboost_model.py, sklearn_model.py
│   │   └── main.py
│   └── requirements.txt
├── docker-compose.yml
└── .github/workflows/ci.yml`,

      overview:
        "A production-grade retail sales forecasting platform that combines traditional ML models with LLM-powered insights. Built for real-world deployment with Docker, CI/CD, and a polished React dashboard.",

      features: [
        "Time-series forecasting with XGBoost + scikit-learn ensemble",
        "Groq/Llama 3.3 integration for natural language query interface over uploaded data",
        "Interactive React dashboard with Recharts (line, bar, area charts)",
        "JWT authentication with role-based route protection",
        "Dockerized microservices with GitHub Actions CI/CD pipeline",
        "REST API built with FastAPI, async endpoints, SQLite persistence",
        "CSV validation with descriptive error messages for malformed uploads",
      ],

      techStack: {
        Frontend: ["React 18", "Vite", "Framer Motion", "Recharts"],
        Backend:  ["FastAPI", "Python 3.11", "SQLite", "Pydantic v2"],
        ML:       ["XGBoost", "scikit-learn", "pandas", "NumPy"],
        AI:       ["Groq API", "Llama 3.3-70B"],
        DevOps:   ["Docker", "GitHub Actions", "Render"],
      },

      challenges:
        "Handling time-series data gaps and irregular sampling intervals in user-uploaded CSVs required building a robust pre-processing step that detects and forward-fills missing date rows before training. Integrating the LLM context window with structured forecast data meant carefully chunking the dataset summary to stay within token limits while preserving enough signal for meaningful answers. Optimizing Docker image size for Render's free tier (512MB RAM) required moving from a full Conda environment to a minimal pip install with compiled wheels.",

      results: [
        "Successfully deployed on Render with Docker containerisation",
        "GitHub Actions CI pipeline runs on every push — linting + unit tests",
        "XGBoost model trained and producing forecasts on uploaded CSV data",
        "LLM query interface connected to Groq API with context-aware responses",
        // TODO: Add real RMSE / accuracy metrics once benchmarks are run on a standard dataset
      ],

      futurePlans: [
        "Add Prophet (Facebook) model as a third forecasting option for stronger seasonality detection",
        "Implement multi-user authentication with per-user data isolation",
        "Export forecast results as PDF report with matplotlib charts",
        "Add real-time sales data ingestion via webhook from e-commerce platforms",
        "Migrate SQLite to PostgreSQL for production-scale data volumes",
      ],

      lessonsLearned: [
        "Structuring a FastAPI project with routers and dependency injection scales much better than flat route files",
        "Docker layer caching (placing pip install before COPY src) reduced build times significantly",
        "Pydantic v2 validators enforce strict schema checks at the API boundary — caught malformed CSV headers early in development",
        "Prompt engineering for the LLM layer required explicit formatting instructions to get consistent, structured answers",
      ],
    },
  },


  // ─── 2. House Price Prediction ──────────────────────────────────────────
  {
    id: "house-price-prediction",
    title: "House Price Prediction App",
    shortDesc: "ML regression app with 87% accuracy, 2K+ views on Hugging Face",
    desc: "ML regression model to predict residential property prices based on location, area, and amenities. Deployed on Hugging Face Spaces with 2K+ views.",
    tech: ["scikit-learn", "Python", "React", "Regression", "Hugging Face"],
    icon: "fa-house",
    featured: false,
    // TODO: Replace with Sajlendra's actual GitHub repo URL
    github: "https://github.com/SAJLENDRAPANDEY/house-price-prediction-app",
    // TODO: Add Hugging Face Space URL
    live: "https://huggingface.co/spaces/sajlendrapandey/house-price-predictor-app",
    category: "ML",
    // TODO: Add actual screenshots to /public/projects/house-price-prediction/
    // Files needed: dashboard.png, prediction.png, charts.png
    images: [
      { src: "/projects/house-price-prediction/dashboard.png",  alt: "House Price Prediction — price estimation UI", label: "Dashboard" },
      { src: "/projects/house-price-prediction/prediction.png", alt: "House Price Prediction — model prediction output", label: "Prediction" },
      { src: "/projects/house-price-prediction/charts.png",     alt: "House Price Prediction — feature importance chart", label: "Charts" },
    ],
    details: {
      businessProblem:
        "Property buyers and sellers in Indian cities lack an accessible, transparent tool to estimate fair market prices. Listings on portals like MagicBricks or 99acres show wide price ranges without explaining the drivers. This app gives users a data-driven price estimate based on location, area (sq ft), number of bedrooms, floor, and nearby amenity features.",

      solution:
        "Trained a gradient boosting ensemble (XGBoost + Linear Regression stacking) on a dataset of residential listings from Indian cities. Built a Gradio interface for the interactive prediction form, deployed on Hugging Face Spaces. The model takes user inputs, applies the same feature engineering used during training (location encoding, area normalisation), and returns a price estimate with a confidence range.",

      architecture: [
        { layer: "Data",       tech: "CSV — Indian property listings", role: "15,000+ property records: location, area, BHK, floor, price" },
        { layer: "Preprocessing", tech: "pandas / scikit-learn",     role: "Label encoding for locations, outlier removal, feature scaling" },
        { layer: "Model",      tech: "XGBoost + Linear Regression",  role: "Stacked ensemble: XGBoost base model, Linear Regression meta-model" },
        { layer: "Evaluation", tech: "scikit-learn metrics",         role: "R² score, MAE, RMSE on held-out test set" },
        { layer: "UI",         tech: "Gradio",                       role: "Interactive form: inputs → model → price output" },
        { layer: "Deployment", tech: "Hugging Face Spaces",          role: "Free hosted inference endpoint, 2K+ views" },
      ],

      workflow: [
        "Collected and cleaned a dataset of 15,000+ Indian residential property listings.",
        "Exploratory Data Analysis (EDA): identified key price drivers (location, area, BHK count).",
        "Feature engineering: ordinal encoding for 500+ localities, area normalisation, BHK as integer.",
        "Outlier removal: IQR-based filtering on price/sqft to remove data entry errors.",
        "Model training: XGBoost as base learner, Linear Regression as meta-model in a stacking ensemble.",
        "Evaluation on 20% held-out test set — R² score of 0.87 (87% variance explained).",
        "Gradio UI built with sliders and dropdowns for all input features.",
        "Deployed to Hugging Face Spaces — publicly accessible, no login required.",
      ],

      apiFlow: null, // No custom API — Gradio handles the inference endpoint

      database: null, // No database — model is a serialised pickle file

      folderStructure: `house-price-prediction/
├── data/
│   ├── raw/              # Original property listings CSV (gitignored)
│   └── processed/        # Cleaned dataset after outlier removal
├── notebooks/
│   ├── eda.ipynb         # Exploratory data analysis
│   ├── feature_eng.ipynb # Encoding, scaling, outlier removal
│   └── modelling.ipynb   # Training, evaluation, stacking ensemble
├── model/
│   ├── model.pkl         # Serialised XGBoost + stacking pipeline
│   └── encoder.pkl       # Fitted label encoder for location column
├── app.py                # Gradio interface definition
└── requirements.txt`,

      overview:
        "A machine learning web app for predicting residential property prices in Indian cities. Trained on 15,000+ property listings with feature engineering and ensemble stacking.",

      features: [
        "Gradient Boosting + Linear Regression stacking ensemble (R² = 0.87 on test set)",
        "Location encoding for 500+ Indian localities using ordinal encoding",
        "Interactive Gradio frontend with sliders for area, BHK, floor, and location dropdown",
        "Feature importance visualisation showing top price drivers",
        "Deployed on Hugging Face Spaces — 2,000+ views, no login required",
        "Confidence range estimate displayed alongside the point prediction",
      ],

      techStack: {
        ML:         ["scikit-learn", "XGBoost", "pandas", "NumPy"],
        UI:         ["Gradio"],
        Deployment: ["Hugging Face Spaces"],
      },

      challenges:
        "Handling high-cardinality categorical data for 500+ Indian locality names was the primary modelling challenge. One-hot encoding would create an excessively wide feature matrix. Ordinal encoding based on median price per locality (target encoding) captured the price-location relationship without dimensionality explosion, but required careful cross-validation to prevent target leakage. Outlier removal was also non-trivial — some legitimate luxury properties at 10x the median price needed to be retained, while data entry errors (area listed as 1 sqft) needed to be dropped.",

      results: [
        "R² score of 0.87 on the held-out test set (87% of price variance explained by the model)",
        "Deployed on Hugging Face Spaces with 2,000+ public views",
        "Location encoding covers 500+ Indian localities",
        "Stacking ensemble outperformed single XGBoost model on the test set",
        // TODO: Add MAE in rupees once available from evaluation notebook
      ],

      futurePlans: [
        "Retrain on a larger, more recent dataset covering 2023–2025 listings",
        "Add neighbourhood-level features: proximity to metro, schools, hospitals",
        "Build a React frontend with map-based location picker (replacing the dropdown)",
        "Expose a REST API endpoint so the model can be embedded in other apps",
        "Add a price trend chart showing how the predicted price would vary with ±20% area change",
      ],

      lessonsLearned: [
        "Target encoding for high-cardinality categoricals must always be computed within cross-validation folds to prevent data leakage",
        "Stacking ensemble adds meaningful improvement over single models when base and meta models have complementary strengths (non-linear XGBoost + linear meta-learner)",
        "Gradio's share=True flag creates a public link from a local machine — useful for rapid sharing before Hugging Face deployment",
        "IQR-based outlier removal is a blunt instrument; domain knowledge (e.g., price/sqft bounds for each city) produces cleaner results",
      ],
    },
  },

// ─── 3. no-waste ────────────────────────────────────────────────────────
  {
    id: "no-waste",
    title: "No-Waste — AI Waste Management System",
    shortDesc: "AI-based platform connecting industries with recycling companies via smart matching",
    desc: "AI-based Waste Management System that connects industries with recycling companies using smart matching algorithms. Built with Django REST Framework, ML, and a web frontend.",
    tech: ["Python", "Django REST", "Machine Learning", "HTML/CSS"],
    icon: "fa-recycle",
    featured: true,
    github: "https://github.com/SAJLENDRAPANDEY/no-waste",
    live: null,
    category: "ML",
    images: [
      { src: "/projects/no-waste/dashboard.png", alt: "No-Waste — dashboard", label: "Dashboard" },
    ],
    details: {
      businessProblem:
        "Industrial waste is often dumped rather than recycled because industries cannot easily find the right recycling partner for their specific waste type. This platform solves the discovery problem with ML-based smart matching.",
      solution:
        "A web platform where industries register their waste type and volume, and the ML matching engine finds the most suitable recycling company from the registered network. Django REST Framework powers the API; the matching algorithm scores compatibility based on waste category, location, and capacity.",
      architecture: [
        { layer: "Frontend",  tech: "HTML/CSS/JS",          role: "Industry and recycler registration, match results UI" },
        { layer: "API",       tech: "Django REST Framework", role: "Auth, waste listings, match request endpoints" },
        { layer: "ML Engine", tech: "Python scikit-learn",   role: "Smart matching algorithm for waste-recycler pairing" },
        { layer: "Database",  tech: "SQLite / PostgreSQL",   role: "Stores industry profiles, waste listings, recyclers" },
      ],
      workflow: [
        "Industry registers and posts waste type, quantity, and location.",
        "ML matching engine scores available recycling companies by compatibility.",
        "Top matches are returned and displayed to the industry.",
        "Industry contacts the selected recycler directly through the platform.",
      ],
      apiFlow: null,
      database: null,
      folderStructure: `no-waste/
├── backend/
│   ├── waste/          # Django app — models, views, serializers
│   ├── matching/       # ML matching logic
│   └── manage.py
├── frontend/
│   └── templates/      # HTML templates
└── requirements.txt`,
      overview:
        "An AI-powered waste management platform that uses smart matching algorithms to connect industries with the right recycling partners — reducing landfill waste and making recycling accessible.",
      features: [
        "Smart ML-based matching between waste producers and recycling companies",
        "Industry and recycler registration with profile management",
        "Waste type categorisation (plastic, metal, organic, electronic, etc.)",
        "Django REST Framework API with authentication",
        "Web frontend for browsing matches and initiating contact",
      ],
      techStack: {
        Backend:   ["Django REST Framework", "Python"],
        ML:        ["scikit-learn"],
        Frontend:  ["HTML", "CSS", "JavaScript"],
        Database:  ["SQLite"],
      },
      challenges:
        "Designing a matching algorithm that accounts for multiple factors (waste category, distance, capacity) without a large labeled training dataset required a weighted scoring approach rather than a supervised model. Built a rule-based scoring engine first, then refined weights based on user feedback.",
      results: [
        "Full matching pipeline working end-to-end on Django",
        "2 GitHub stars — open source and public",
        "Waste categorisation covers 10+ waste types",
      ],
      futurePlans: [
        "Add geolocation-based filtering using Google Maps API",
        "Upgrade matching to a collaborative filtering model as usage data grows",
        "Add email notifications when a match is found",
      ],
      lessonsLearned: [
        "Rule-based scoring systems are a practical starting point when labeled data is scarce",
        "Django REST Framework's serializers enforce clean API contracts early",
      ],
    },
  },

  // ─── 4. Credit Card Fraud Detection ─────────────────────────────────────
  {
    id: "credit-card-fraud-detection",
    title: "Credit Card Fraud Detection — ML",
    shortDesc: "ML model to detect fraudulent credit card transactions using ensemble methods",
    desc: "Machine learning project for credit card fraud detection using ensemble classification methods on highly imbalanced financial transaction data.",
    tech: ["Python", "scikit-learn", "XGBoost", "pandas", "Jupyter"],
    icon: "fa-shield-halved",
    featured: true,
    github: "https://github.com/SAJLENDRAPANDEY/Credit-Card-Fraud-Detection-ML",
    live: null,
    category: "ML",
    images: [
      { src: "/projects/credit-card-fraud-detection/notebook.png", alt: "Credit Card Fraud Detection — notebook", label: "Notebook" },
      { src: "/projects/credit-card-fraud-detection/charts.png", alt: "Credit Card Fraud Detection — ROC curve", label: "ROC Curve" },
    ],
    details: {
      businessProblem:
        "Credit card fraud costs financial institutions billions annually. Fraud transactions represent less than 0.2% of all transactions, making this a severe class-imbalance problem where naive classifiers achieve high accuracy by simply predicting 'not fraud' every time. This project builds a model that can reliably detect the rare fraud cases.",
      solution:
        "Applied SMOTE (Synthetic Minority Oversampling Technique) to balance the training set, then trained and compared Logistic Regression, Random Forest, and XGBoost classifiers. Evaluated on Precision, Recall, F1-Score, and ROC-AUC — prioritising Recall to minimise missed frauds.",
      architecture: [
        { layer: "Data",          tech: "Kaggle Credit Card Dataset", role: "284,807 transactions, 492 fraudulent (0.17%)" },
        { layer: "Preprocessing", tech: "pandas / NumPy",             role: "StandardScaler on Amount/Time, SMOTE oversampling" },
        { layer: "Models",        tech: "scikit-learn / XGBoost",     role: "Logistic Regression, Random Forest, XGBoost" },
        { layer: "Evaluation",    tech: "scikit-learn metrics",       role: "Confusion matrix, ROC-AUC, Precision-Recall curve" },
        { layer: "Notebook",      tech: "Jupyter",                    role: "Full EDA + training + evaluation pipeline" },
      ],
      workflow: [
        "Load and explore the Kaggle credit card transactions dataset (284K rows).",
        "EDA: visualise class imbalance, feature distributions, correlation heatmap.",
        "Preprocessing: StandardScaler on Amount and Time features; drop unused columns.",
        "Apply SMOTE on training set only to avoid data leakage.",
        "Train Logistic Regression, Random Forest, and XGBoost classifiers.",
        "Compare models on ROC-AUC, Precision, Recall, and F1-Score.",
        "Select best model and plot confusion matrix and ROC curve.",
      ],
      apiFlow: null,
      database: null,
      folderStructure: `Credit-Card-Fraud-Detection-ML/
├── notebooks/
│   └── fraud_detection.ipynb   # Full pipeline
├── data/                       # Dataset (gitignored — download from Kaggle)
├── models/                     # Saved model pickle files
└── README.md`,
      overview:
        "A machine learning project tackling highly imbalanced credit card transaction data to build a reliable fraud detector using SMOTE and ensemble classification.",
      features: [
        "Class imbalance handling with SMOTE oversampling on training data only",
        "Three-model comparison: Logistic Regression, Random Forest, XGBoost",
        "Evaluation on ROC-AUC, Precision, Recall, F1 — not just accuracy",
        "Confusion matrix and Precision-Recall curve visualisations",
        "Feature importance analysis from Random Forest and XGBoost",
        "Full reproducible Jupyter notebook pipeline",
      ],
      techStack: {
        ML:          ["scikit-learn", "XGBoost", "imbalanced-learn (SMOTE)"],
        Analysis:    ["pandas", "NumPy", "Matplotlib", "Seaborn"],
        Environment: ["Jupyter Notebook"],
      },
      challenges:
        "The extreme class imbalance (0.17% fraud) meant standard accuracy was misleading — a model predicting 'not fraud' 100% of the time still scores 99.83%. Shifted evaluation entirely to Recall and ROC-AUC. Applying SMOTE only to the training fold inside cross-validation (not the full dataset before splitting) was critical to prevent inflated evaluation scores.",
      results: [
        "XGBoost achieved highest ROC-AUC score among the three models tested",
        "SMOTE successfully balanced training classes for meaningful model learning",
        "2 GitHub stars — open source and public",
        "Full reproducible notebook with EDA, training, and evaluation",
      ],
      futurePlans: [
        "Deploy as a FastAPI endpoint for real-time transaction scoring",
        "Add SHAP explainability to show which features triggered the fraud flag",
        "Experiment with Isolation Forest for unsupervised anomaly detection",
      ],
      lessonsLearned: [
        "Accuracy is a misleading metric for imbalanced datasets — always check Recall and F1",
        "SMOTE must be applied inside the cross-validation loop, not before the train/test split",
        "XGBoost's built-in scale_pos_weight parameter is an alternative to SMOTE worth comparing",
      ],
    },
  },

  // ─── 5. Supplement Sales Analytics ─────────────────────────────────────
  {
    id: "supplement-sales-analytics",
    title: "Supplement Sales Analytics — PostgreSQL",
    shortDesc: "End-to-end sales analytics pipeline using PostgreSQL and Python",
    desc: "End-to-end retail sales analytics pipeline using PostgreSQL and Python to uncover insights on supplement product performance, profit margins, and business trends.",
    tech: ["PostgreSQL", "Python", "pandas", "SQL", "Matplotlib"],
    icon: "fa-database",
    featured: false,
    github: "https://github.com/SAJLENDRAPANDEY/Supplement-Sales-Analytics-using-PostgreSQL",
    live: null,
    category: "Analytics",
    images: [
      { src: "/projects/supplement-sales-analytics/dashboard.png", alt: "Supplement Sales — analytics dashboard", label: "Dashboard" },
      { src: "/projects/supplement-sales-analytics/charts.png",    alt: "Supplement Sales — profit charts",       label: "Charts" },
    ],
    details: {
      businessProblem:
        "Supplement retail businesses need clear visibility into which products drive profit, how discounts impact margins, and which sales channels or regions perform best. Raw transaction tables in a database don't directly answer these questions without structured analytical queries.",
      solution:
        "Built a full analytics pipeline: raw sales data loaded into PostgreSQL, complex SQL queries extract KPIs (revenue by product, profit margin, discount impact, category performance), and Python/Matplotlib visualises the results into actionable charts.",
      architecture: [
        { layer: "Data",      tech: "CSV Sales Data",          role: "Raw supplement sales transactions" },
        { layer: "Database",  tech: "PostgreSQL",              role: "Stores normalised sales, products, categories tables" },
        { layer: "Analytics", tech: "SQL + PostgreSQL CTEs",   role: "Revenue, profit, discount, category KPI queries" },
        { layer: "Python",    tech: "pandas + psycopg2",       role: "Connects to PostgreSQL, runs queries, builds DataFrames" },
        { layer: "Viz",       tech: "Matplotlib / Seaborn",    role: "Bar, line, and pie charts for insights" },
      ],
      workflow: [
        "Load raw supplement sales CSV into PostgreSQL using psycopg2.",
        "Design normalised schema: products, categories, transactions, customers.",
        "Write analytical SQL queries for revenue trends, top products, profit margin.",
        "Pull query results into pandas DataFrames via psycopg2.",
        "Generate charts: revenue by category, discount impact, monthly trend.",
        "Export summary charts as PNG for presentation.",
      ],
      apiFlow: null,
      database: {
        tables: [
          { name: "products",      columns: "id, name, category, cost_price, selling_price" },
          { name: "transactions",  columns: "id, product_id, date, quantity, discount_pct, channel" },
          { name: "categories",    columns: "id, name, description" },
        ],
        notes: "PostgreSQL used for robust query performance on multi-year transaction data.",
      },
      folderStructure: `Supplement-Sales-Analytics-using-PostgreSQL/
├── data/              # Raw CSV files
├── sql/               # Analytical query files
│   ├── revenue.sql
│   ├── profit.sql
│   └── discount_analysis.sql
├── notebooks/
│   └── analysis.ipynb # Python + visualisations
└── README.md`,
      overview:
        "A complete SQL + Python analytics project analysing supplement product sales through PostgreSQL queries and Matplotlib visualisations.",
      features: [
        "PostgreSQL database with normalised schema for supplement sales data",
        "Complex SQL queries with CTEs for revenue, profit, and discount analysis",
        "Python psycopg2 integration to pull query results into pandas",
        "Matplotlib/Seaborn charts for business insight visualisation",
        "3 GitHub stars — most starred analytics project in the portfolio",
      ],
      techStack: {
        Database: ["PostgreSQL", "SQL"],
        Python:   ["pandas", "psycopg2", "Matplotlib", "Seaborn"],
      },
      challenges:
        "Discount impact analysis required a multi-step SQL CTE to compare revenue with and without the discount on the same product — simple aggregations gave misleading results. Also handled NULL discount_pct values in source data with COALESCE in the schema definition.",
      results: [
        "3 GitHub stars — highest starred analytics project in portfolio",
        "Full end-to-end pipeline from raw CSV to visual insights",
        "Discount impact, profit margin, and category performance all analysed",
      ],
      futurePlans: [
        "Build a Power BI dashboard connecting directly to the PostgreSQL database",
        "Add a FastAPI layer to expose KPI endpoints for a frontend dashboard",
        "Automate monthly data ingestion with a Python scheduler",
      ],
      lessonsLearned: [
        "PostgreSQL CTEs make multi-step discount calculations readable and maintainable",
        "COALESCE for NULL handling in analytical queries prevents silent data loss",
        "psycopg2 + pandas is a clean pattern for Python-PostgreSQL analytics pipelines",
      ],
    },
  },
];

export const certifications = [
  { title: "Advanced Certificate in Data Science & Engineering", issuer: "Scaler",          badge: "Data Science", icon: "fa-award" },
  { title: "Postman API Fundamentals Student Expert",            issuer: "Postman",          badge: "API",          icon: "fa-plug" },
  { title: "Python for Data Science",                           issuer: "NPTEL / Coursera", badge: "Python",       icon: "fa-python" },
  { title: "GenAI 101 — Generative AI Fundamentals",            issuer: "Google / IBM",     badge: "GenAI",        icon: "fa-microchip" },
  { title: "Excel Bootcamp — Data Analysis",                    issuer: "Udemy",            badge: "Excel",        icon: "fa-file-excel" },
  { title: "Power BI Fundamentals",                             issuer: "Microsoft Learn",  badge: "BI",           icon: "fa-chart-bar" },
];

export const blogs = [
  {
    tag: "MACHINE LEARNING",
    title: "Top 5 Machine Learning Algorithms Every Data Scientist Must Know",
    desc: "A practical breakdown of the most important ML algorithms with real-world use cases and when to use each one.",
    link: "https://yashutech.hashnode.dev/machine-learning-roadmap-for-beginners-in-2026",
  },
  {
    tag: "AI CONCEPTS",
    title: "ML vs Deep Learning — When to Use Which (With Real Examples)",
    desc: "Clear, jargon-free explanation of when to use ML vs DL, with examples from production systems.",
    link: "https://yashutech.hashnode.dev/",
  },
  {
    tag: "CAREER",
    title: "Data Analytics Roadmap 2026 — From Zero to Job-Ready",
    desc: "A structured, honest guide to becoming a Data Analyst in 2026 — tools, projects, and what actually matters to recruiters.",
    link: "https://yashutech.hashnode.dev/python-data-types-explained-for-beginners",
  },
];

export const leetcodeStats = [
  { num: "200+",    label: "Problems Solved" },
  { num: "1500+",   label: "Contest Rating" },
  { num: "Top 25%", label: "Global Rank" },
];

export const gfgStats = [
  { num: "155+",  label: "Problems Solved" },
  { num: "329",   label: "Coding Score" },
  { num: "#33",   label: "Institute Rank" },
];

export const gfgDifficultyStats = [
  { num: "39", label: "Basic" },
  { num: "84", label: "Easy" },
  { num: "31", label: "Medium" },
  { num: "1",  label: "Hard" },
];

export const timeline = [
  { year: "2023", icon: "fa-graduation-cap", title: "Started B.Tech CSE",         desc: "Joined MDU Rohtak for B.Tech in Computer Science (Data Science). Began learning Python and data fundamentals.",                      color: "#38bdf8" },
  { year: "2024", icon: "fa-code",           title: "First Internship",            desc: "Python Developer Intern at CodSoft. Built 4 automation projects and deepened OOP + scripting skills.",                               color: "#818cf8" },
  { year: "2024", icon: "fa-brain",          title: "ML Projects Launch",          desc: "Launched House Price Prediction on Hugging Face (2K+ views). Started exploring XGBoost, scikit-learn, FastAPI.",                      color: "#34d399" },
  { year: "2025", icon: "fa-chart-line",     title: "Retail Forecasting Platform", desc: "Built full-stack Retail Sales Forecasting with Groq/Llama 3.3, Docker, GitHub Actions CI/CD.",                                      color: "#f59e0b" },
  { year: "2026", icon: "fa-users",          title: "GSSoC Campus Ambassador",     desc: "Representing GirlScript Summer of Code on campus. Onboarding contributors and building open-source community.",                       color: "#818cf8" },
];
