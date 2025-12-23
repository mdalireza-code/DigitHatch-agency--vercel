document.addEventListener("DOMContentLoaded", () => {

  const projects = document.querySelectorAll(".project-item");
  const pagination = document.getElementById("pagination");
  const modal = new bootstrap.Modal(document.getElementById("projectModal"));

  const perPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(projects.length / perPage);

  function showPage(page) {
    currentPage = page;

    projects.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * perPage && index < page * perPage
          ? "block"
          : "none";
    });

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? "active" : ""}`;
      li.innerHTML = `<a href="#" class="page-link">${i}</a>`;

      li.onclick = e => {
        e.preventDefault();
        showPage(i);
      };

      pagination.appendChild(li);
    }
  }

  // INIT
  showPage(1);

  // MODAL OPEN
  projects.forEach(item => {
    item.addEventListener("click", () => {
      document.getElementById("modalTitle").textContent = item.dataset.title;
      document.getElementById("modalCategory").textContent = item.dataset.category;
      document.getElementById("modalDesc").textContent = item.dataset.desc;
      document.getElementById("modalImg").src = item.dataset.img;
      modal.show();
    });
  });

});
