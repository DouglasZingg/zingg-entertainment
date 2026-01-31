const featuredContainer = document.getElementById("featured-projects");
const projectList = document.getElementById("project-list");

const homeFilterButtons = document.querySelectorAll("main .filters button");
const filterButtons = document.querySelectorAll("#filters button, .filters button");

function setActiveFilter(buttons, activeBtn) {
  buttons.forEach(b => b.classList.remove("active"));
  activeBtn.classList.add("active");
}

function setCountText(countEl, count) {
  if (!countEl) return;
  countEl.textContent = `${count} project${count !== 1 ? "s" : ""}`;
}

function asArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val.trim()) return [val.trim()];
  return [];
}

function makeProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  const title = project?.title || "Untitled Project";
  const summary = project?.summary || "";
  const tech = asArray(project?.tech);
  const domain = project?.domain;

  const domainLabel = Array.isArray(domain) ? domain.filter(Boolean).join(" • ") : (domain || "");
  const domainChip = domainLabel ? `<span class="chip chip-domain">${domainLabel}</span>` : "";
  const techChips = tech.map(t => `<span class="chip">${t}</span>`).join("");

  const chipsRow = (domainChip || techChips)
    ? `<div class="chip-row">${domainChip}${techChips}</div>`
    : "";

  const detailsLink = project?.page
    ? `<a class="primary-link" href="${project.page}">Details</a>`
    : "";

  const githubLink = project?.github
    ? `<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>`
    : "";

  card.innerHTML = `
    <h3>${title}</h3>
    ${summary ? `<p>${summary}</p>` : ""}
    ${chipsRow}
    ${(detailsLink || githubLink) ? `<div class="card-actions">${detailsLink}${githubLink}</div>` : ""}
  `;

  return card;
}

function renderFeaturedProjects(techFilter = "all") {
  if (!featuredContainer) return;

  featuredContainer.innerHTML = "";

  let list = Array.isArray(window.projects) ? window.projects.filter(p => p?.featured === true) : [];

  if (techFilter !== "all") {
    list = list.filter(p => asArray(p.tech).includes(techFilter));
  }

  const featuredCount = document.getElementById("featured-count");
  setCountText(featuredCount, list.length);

  if (list.length === 0) {
    featuredContainer.innerHTML = `<p class="meta">No featured projects match "${techFilter}".</p>`;
    return;
  }

  list.forEach(project => featuredContainer.appendChild(makeProjectCard(project)));
}

function renderProjects(filter = "all") {
  if (!projectList) return;

  projectList.innerHTML = "";

  const allProjects = Array.isArray(window.projects) ? window.projects : [];

  const filtered = (filter === "all")
    ? allProjects
    : allProjects.filter(p => asArray(p?.tech).includes(filter));

  const projectCount = document.getElementById("project-count");
  setCountText(projectCount, filtered.length);

  if (filtered.length === 0) {
    projectList.innerHTML = `<p class="meta">No projects match "${filter}".</p>`;
    return;
  }

  filtered.forEach(project => projectList.appendChild(makeProjectCard(project)));
}

if (featuredContainer && homeFilterButtons.length > 0) {
  homeFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      setActiveFilter(homeFilterButtons, btn);
      renderFeaturedProjects(btn.dataset.tech || "all");
    });
  });

  renderFeaturedProjects("all");
  homeFilterButtons[0]?.classList.add("active");
}

if (projectList && filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      setActiveFilter(filterButtons, btn);
      renderProjects(btn.dataset.tech || "all");
    });
  });

  renderProjects("all");
  filterButtons[0]?.classList.add("active");
}
