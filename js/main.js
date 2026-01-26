const featuredContainer = document.getElementById("featured-projects");
const projectList = document.getElementById("project-list");
const filterButtons = document.querySelectorAll(".filters button");
const homeFilterButtons = document.querySelectorAll(".filters button");

function renderFeaturedProjects(techFilter = "all") {
    if (!featuredContainer) return;

    featuredContainer.innerHTML = "";

    // 1) Start from featured-only
    let list = projects.filter(p => p.featured === true);

    // 2) Then apply tech filter (unless "all")
    if (techFilter !== "all") {
        list = list.filter(p => Array.isArray(p.tech) && p.tech.includes(techFilter));
    }

    // 3) Empty state
    if (list.length === 0) {
        featuredContainer.innerHTML = `<p class="meta">No featured projects match "${techFilter}".</p>`;
        return;
    }

    // 4) Render cards
    list.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <p class="meta">${project.tech.join(" - ")}</p>
      <a href="${project.page}">View Details -></a>
      <br />
      <a href="${project.github}" target="_blank">View Code -></a>
    `;

        featuredContainer.appendChild(card);
    });
}

// Wire up the buttons (only on pages that have them)
if (featuredContainer && homeFilterButtons.length > 0) {
    homeFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            renderFeaturedProjects(btn.dataset.tech);
        });
    });

    // Initial render
    renderFeaturedProjects("all");
}


function renderProjects(filter) {
    if (!projectList) return;

    projectList.innerHTML = "";

    const filtered = filter === "all"
        ? projects
        : projects.filter(p => p.tech.includes(filter));

    filtered.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
            <p class="meta">${project.tech.join(" - ")}</p>
            <a href="${project.page}">View Details -></a>
            <br />
            <a href="${project.github}" target="_blank">View Code -></a>
        `;

        projectList.appendChild(card);
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        renderProjects(btn.dataset.tech);
    });
});

// Initial render
renderProjects("all");