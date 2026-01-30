const featuredContainer = document.getElementById("featured-projects");
const projectList = document.getElementById("project-list");

// Home page filter buttons (index.html)
const homeFilterButtons = document.querySelectorAll("main .filters button");

// Projects page filter buttons (projects.html)
const filterButtons = document.querySelectorAll("#filters button, .filters button");

function setActiveFilter(buttons, activeBtn) {
    buttons.forEach(b => b.classList.remove("active"));
    activeBtn.classList.add("active");
}

function makeProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    const techChips = Array.isArray(project.tech)
        ? project.tech.map(t => `<span class="chip">${t}</span>`).join("")
        : "";

    const detailsLink = project.page
        ? `<a href="${project.page}">Details</a>`
        : "";

    const githubLink = project.github
        ? `<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>`
        : "";

    card.innerHTML = `
    <h3>${project.title || "Untitled Project"}</h3>
    <p>${project.summary || ""}</p>

    <div class="chip-row">
      ${techChips}
    </div>

    <div class="card-actions">
      ${detailsLink}
      ${githubLink}
    </div>
  `;

    return card;
}

function renderFeaturedProjects(techFilter = "all") {
    if (!featuredContainer) return;

    featuredContainer.innerHTML = "";

    let list = Array.isArray(projects) ? projects.filter(p => p.featured === true) : [];

    if (techFilter !== "all") {
        list = list.filter(p => Array.isArray(p.tech) && p.tech.includes(techFilter));
    }

    if (list.length === 0) {
        featuredContainer.innerHTML = `<p class="meta">No featured projects match "${techFilter}".</p>`;
        return;
    }

    list.forEach(project => {
        featuredContainer.appendChild(makeProjectCard(project));
    });
}

function renderProjects(filter = "all") {
    if (!projectList) return;

    projectList.innerHTML = "";

    const allProjects = Array.isArray(projects) ? projects : [];

    const filtered = filter === "all"
        ? allProjects
        : allProjects.filter(p => Array.isArray(p.tech) && p.tech.includes(filter));

    if (filtered.length === 0) {
        projectList.innerHTML = `<p class="meta">No projects match "${filter}".</p>`;
        return;
    }

    filtered.forEach(project => {
        projectList.appendChild(makeProjectCard(project));
    });
}

// Wire up homepage filters (only if featured container exists)
if (featuredContainer && homeFilterButtons.length > 0) {
    homeFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            setActiveFilter(homeFilterButtons, btn);
            renderFeaturedProjects(btn.dataset.tech || "all");
        });
    });

    // Default
    renderFeaturedProjects("all");
    homeFilterButtons[0]?.classList.add("active");
}

// Wire up projects page filters (only if project list exists)
if (projectList && filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            setActiveFilter(filterButtons, btn);
            renderProjects(btn.dataset.tech || "all");
        });
    });

    // Default
    renderProjects("all");
    filterButtons[0]?.classList.add("active");
}
