window.addEventListener("load", () => {
  const counters = [
    {
      id: "followers",
      target: 80000,
    },
    {
      id: "likes",
      target: 800003,
    },
    {
      id: "photos",
      target: 1400,
    },
  ];

  counters.forEach((counter) => {
    const element = document.getElementById(counter.id);
    let count = 0;
    const speed = counter.target / 100;

    const updateCount = () => {
      if (count < counter.target) {
        count += speed;
        element.textContent = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = formatNumber(counter.target);
      }
    };

    updateCount();
  });

  // Function to format number like 80k, 1.4k
  function formatNumber(num) {
    if (num >= 1000000)
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
});
