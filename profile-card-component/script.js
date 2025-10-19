console.log("Active!");
console.log("Active!");

const followerCount = document.getElementById("followers");
const likesCount = document.getElementById("likes");
const photosCount = document.getElementById("photos");

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
        element.textContent = counter.target;
      }
    };

    updateCount();
  });
});
