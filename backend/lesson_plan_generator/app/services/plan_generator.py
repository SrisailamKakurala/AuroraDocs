import google.generativeai as genai # type: ignore
from app.config.env import config
from datetime import datetime, timedelta

# Configure Gemini API
genai.configure(api_key=config.GEMINI_API_KEY)

def generate_lesson_plan(topic):
    # Define the prompt for Gemini
    prompt = f"""
    Generate a 5-day lesson plan for the topic: {topic}. 
    Include a schedule with the following details for each day:
    - Day number
    - Date (start from today)
    - Content description
    Provide the output in JSON format with keys: 'topic', 'duration', 'schedule' (list of dictionaries with 'day', 'date', 'content'), and 'latex' (a LaTeX string for the plan).
    Ensure the LaTeX includes a section with an itemized list of days and their content.
    """

    try:
        # Generate response using Gemini
        response = genai.GenerativeModel('gemini-pro').generate_content(prompt)
        # Parse the response (assuming Gemini returns a JSON-like string)
        import json
        plan_data = json.loads(response.text)

        # Ensure dates are formatted correctly
        start_date = datetime.now().date()
        plan_data["schedule"] = [
            {
                "day": day["day"],
                "date": (start_date + timedelta(days=day["day"] - 1)).strftime("%Y-%m-%d"),
                "content": day["content"]
            }
            for day in plan_data["schedule"]
        ]

        # Generate LaTeX if not provided or enhance it
        if not plan_data.get("latex"):
            latex_content = r"""
\documentclass{article}
\usepackage[utf8]{inputenc}
\usepackage{geometry}
\geometry{a4paper, margin=1in}
\usepackage{enumitem}
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\rhead{Lesson Plan for \textbf{%s}}
\lfoot{Generated on %s}
\begin{document}

\section*{Lesson Plan}
\begin{itemize}[leftmargin=*]
%s
\end{itemize}

\end{document}
""" % (plan_data["topic"], datetime.now().strftime("%Y-%m-%d"),
       "\n".join([f"\\item \\textbf{{Day {day['day']} ({day['date']})}}: {day['content']}" for day in plan_data["schedule"]]))
            plan_data["latex"] = latex_content

        return plan_data

    except Exception as e:
        # Fallback to static plan if Gemini fails
        print(f"Gemini API error: {e}")
        start_date = datetime.now().date()
        return {
            "topic": topic,
            "duration": 5,
            "schedule": [
                {"day": 1, "date": start_date.strftime("%Y-%m-%d"), "content": f"Introduction to {topic}"},
                {"day": 2, "date": (start_date + timedelta(days=1)).strftime("%Y-%m-%d"), "content": "Core Concepts"},
                {"day": 3, "date": (start_date + timedelta(days=2)).strftime("%Y-%m-%d"), "content": "Practical Examples"},
                {"day": 4, "date": (start_date + timedelta(days=3)).strftime("%Y-%m-%d"), "content": "Review"},
                {"day": 5, "date": (start_date + timedelta(days=4)).strftime("%Y-%m-%d"), "content": "Assessment"},
            ],
            "latex": r"""
\documentclass{article}
\usepackage[utf8]{inputenc}
\usepackage{geometry}
\geometry{a4paper, margin=1in}
\usepackage{enumitem}
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\rhead{Lesson Plan for \textbf{%s}}
\lfoot{Generated on %s}
\begin{document}

\section*{Lesson Plan}
\begin{itemize}[leftmargin=*]
\item \textbf{Day 1 (%s)}: Introduction to %s
\item \textbf{Day 2 (%s)}: Core Concepts
\item \textbf{Day 3 (%s)}: Practical Examples
\item \textbf{Day 4 (%s)}: Review
\item \textbf{Day 5 (%s)}: Assessment
\end{itemize}

\end{document}
""" % (topic, datetime.now().strftime("%Y-%m-%d"), start_date.strftime("%Y-%m-%d"), topic,
       (start_date + timedelta(days=1)).strftime("%Y-%m-%d"),
       (start_date + timedelta(days=2)).strftime("%Y-%m-%d"),
       (start_date + timedelta(days=3)).strftime("%Y-%m-%d"),
       (start_date + timedelta(days=4)).strftime("%Y-%m-%d"))
        }