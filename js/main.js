const featuredContainer = document.getElementById("featured-projects");
const projectList = document.getElementById("project-list");
const filterButtons = document.querySelectorAll(".filters button");

if (featuredContainer) {
    const featured = projects.filter(p => p.featured);

    featured.forEach(project => {
        const div = document.createElement("div");
        div.className = "project-card";

        div.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <p class="meta">${project.tech.join(" • ")}</p>
      <a href="${project.github}" target="_blank">View Code ?</a>
    `;

        featuredContainer.appendChild(div);
    });
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
            <p class="meta">${project.tech.join(" • ")}</p>
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