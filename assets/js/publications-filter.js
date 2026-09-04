// Client-side year / research-theme filter for the publications page.
// Progressive enhancement: the form is rendered hidden and the full list is always
// present in the HTML; this script only reveals the controls and hides non-matches.
(function () {
  var form = document.getElementById("publication-filters");
  var items = Array.prototype.slice.call(document.querySelectorAll(".publication[data-year]"));
  if (!form || items.length === 0) return;

  var yearSelect = document.getElementById("filter-year");
  var themeSelect = document.getElementById("filter-theme");
  var status = document.getElementById("filter-status");
  var empty = document.getElementById("filter-empty");
  var groups = Array.prototype.slice.call(document.querySelectorAll("[data-year-group]"));
  var total = items.length;

  function applyFilters() {
    var year = yearSelect.value;
    var theme = themeSelect.value;
    var visible = 0;

    items.forEach(function (item) {
      var themes = (item.getAttribute("data-themes") || "").split(" ");
      var matches =
        (!year || item.getAttribute("data-year") === year) &&
        (!theme || themes.indexOf(theme) !== -1);
      item.hidden = !matches;
      if (matches) visible += 1;
    });

    groups.forEach(function (group) {
      var anyVisible = Array.prototype.some.call(
        group.querySelectorAll(".publication"),
        function (item) { return !item.hidden; }
      );
      group.hidden = !anyVisible;
    });

    empty.hidden = visible !== 0;
    status.textContent = year || theme
      ? "Showing " + visible + " of " + total + " publications."
      : "";
  }

  form.hidden = false;
  yearSelect.addEventListener("change", applyFilters);
  themeSelect.addEventListener("change", applyFilters);
  form.addEventListener("reset", function () {
    // Wait for the browser to clear the fields before re-applying.
    window.setTimeout(applyFilters, 0);
  });
  applyFilters();
})();
