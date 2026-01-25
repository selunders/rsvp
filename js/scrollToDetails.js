detailss = document.querySelectorAll("details");

for (const details of detailss) {
  details.addEventListener("toggle", (event) => {
    if (details.open)
      setTimeout(() => details.scrollIntoView({ behavior: "smooth" }), 500);
  });
}
