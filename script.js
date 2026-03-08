const treeData = [
    {
        title: "Python Tutorial",
        icon: "book-open",
        children: ["Python HOME", "Python Intro", "Python Get Started", "Python Syntax", "Python Output", "Python Comments", "Python Variables", "Python Data Types", "Python Numbers", "Python Casting", "Python Strings", "Python Booleans", "Python Operators", "Python Lists", "Python Tuples", "Python Sets", "Python Dictionaries", "Python If...Else", "Python Match", "Python While Loops", "Python For Loops", "Python Functions", "Python Range", "Python Arrays", "Python Iterators", "Python Modules", "Python Dates", "Python Math", "Python JSON", "Python RegEx", "Python PIP", "Python Try...Except", "Python String Formatting", "Python None", "Python User Input", "Python VirtualEnv"]
    },
    {
        title: "Python Classes & OOP",
        icon: "layers",
        children: ["Python Classes", "Python OOP", "Python Classes/Objects", "Python __init__ Method", "Python self Parameter", "Python Class Properties", "Python Class Methods", "Python Inheritance", "Python Polymorphism", "Python Encapsulation", "Python Inner Classes"]
    },
    {
        title: "File Handling",
        icon: "file-code",
        children: ["Python File Handling", "Python Read Files", "Python Write/Create Files", "Python Delete Files"]
    },
    {
        title: "Python Modules",
        icon: "box",
        children: ["NumPy Tutorial", "Pandas Tutorial", "SciPy Tutorial"]
    },
    {
        title: "Python Reference",
        icon: "bookmark",
        children: ["Python Overview", "Python Built-in Functions", "Python String Methods", "Python List Methods", "Python Dictionary Methods", "Python Tuple Methods", "Python Set Methods", "Python File Methods", "Python Keywords", "Python Exceptions", "Python Glossary"]
    },
    {
        title: "Module Reference",
        icon: "package",
        children: ["Built-in Modules", "Random Module", "Requests Module", "Statistics Module", "Math Module", "cMath Module"]
    },
    {
        title: "Python How To",
        icon: "help-circle",
        children: ["Remove List Duplicates", "Reverse a String", "Add Two Numbers"]
    },
    {
        title: "Python Examples",
        icon: "code",
        children: ["Python Examples", "Python Compiler", "Python Exercises", "Python Quiz", "Python Server", "Python Syllabus", "Python Study Plan", "Python Interview Q&A", "Python Bootcamp", "Python Certificate", "Python Training"]
    }
];

const flatList = treeData.flatMap(section => section.children);

function init() {
    // Sync theme icon on page load
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const icon = document.getElementById("theme-icon");

    if (icon) {
        icon.setAttribute("data-lucide", currentTheme === "dark" ? "moon" : "sun");
    }

    const sidebar = document.getElementById('sidebar');
    const navBox = document.getElementById('nav-buttons');
    const titleEl = document.getElementById('topic-title');
    const bodyEl = document.getElementById('topic-body');

    let currentPath = decodeURIComponent(window.location.pathname.split("/").pop());
    if (!currentPath || currentPath === "index.html") currentPath = "Python Intro.html";
    const currentPageName = currentPath.replace(".html", "");

    // 1. Build Sidebar with Search
    let html = `
        <div style="padding: 15px; border-bottom: 1px solid var(--border);">
            <div style="position: relative; display: flex; align-items: center;">
                <i data-lucide="search" size="14" style="position: absolute; left: 10px; color: var(--text-muted);"></i>
                <input type="text" id="sidebar-search" class="search-input" placeholder="Search topics...">
            </div>
        </div>
        <div class="index-scroll" id="sidebar-list">`;

    treeData.forEach(section => {
        const isOpen = section.children.some(child => child + ".html" === currentPath);
        html += `
            <div class="tree-node ${isOpen ? 'open' : ''}">
                <div class="tree-folder" onclick="this.parentElement.classList.toggle('open')">
                    <i data-lucide="chevron-right" size="16"></i>
                    <i data-lucide="${section.icon}" size="18"></i>
                    <span>${section.title}</span>
                </div>
                <div class="tree-children">
                    ${section.children.map(child => {
            const active = (child + ".html" === currentPath) ? 'active' : '';
            return `<a href="${child}.html" class="tree-leaf ${active}">${child}</a>`;
        }).join('')}
                </div>
            </div>`;
    });
    sidebar.innerHTML = html + `</div>`;

    // 2. Setup Search Listener
    document.getElementById('sidebar-search').addEventListener('input', (e) => filterTopics(e.target.value));

    // 3. Render Page Info
    // Only update title if empty
    if (!titleEl.innerText.trim()) {
        titleEl.innerText = currentPageName;
    }

    // update module name placeholder if present
    const moduleEl = document.getElementById("moduleName");
    if (moduleEl && !moduleEl.innerText.trim()) {
        moduleEl.innerText = currentPageName;
    }

    // update code block text if exists
    const codeEl = document.getElementById("codeBlock");
    if (codeEl) {
        codeEl.textContent = `# Welcome to ${currentPageName}\nprint("Python is awesome!")`;
    }

    // 4. Navigation Logic
    const idx = flatList.indexOf(currentPageName);
    if (idx !== -1) {
        let navHtml = "";
        if (idx > 0) {
            navHtml += `<a href="${flatList[idx - 1]}.html" class="nav-btn"><span class="nav-label">Previous</span><b>← ${flatList[idx - 1]}</b></a>`;
        } else { navHtml += "<div></div>"; }
        if (idx < flatList.length - 1) {
            navHtml += `<a href="${flatList[idx + 1]}.html" class="nav-btn" style="text-align:right"><span class="nav-label">Next</span><b>${flatList[idx + 1]} →</b></a>`;
        }
        navBox.innerHTML = navHtml;
    }
    lucide.createIcons();
}

function filterTopics(query) {
    const term = query.toLowerCase();
    document.querySelectorAll('.tree-node').forEach(node => {
        let match = false;
        node.querySelectorAll('.tree-leaf').forEach(leaf => {
            const show = leaf.innerText.toLowerCase().includes(term);
            leaf.style.display = show ? 'block' : 'none';
            if (show) match = true;
        });
        node.style.display = match ? 'block' : 'none';
        if (term.length > 0 && match) node.classList.add('open');
    });
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('hidden'); }

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    const icon = document.getElementById("theme-icon");
    if (icon) {
        icon.setAttribute("data-lucide", newTheme === "dark" ? "moon" : "sun");
        lucide.createIcons();
    }
}

window.addEventListener('DOMContentLoaded', init);
