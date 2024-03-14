class Star {
  constructor({ x, y, apsis, period, phase }) {
    this.x = x;
    this.y = y;
    this.apsis = apsis;
    this.period = period;
    this.phase = phase;
  }
}

class Galaxy {
  constructor({ x, y, size, min, stars }) {
    this.x = x;
    this.y = y;
    this.stars = [];
    for (let i = 0; i < stars; i++) {
      let offset = Math.random() * size;
      this.stars.push(
        new Star({
          x: this.x + offset + min,
          y: this.y + offset + min,
          apsis: offset + min,
          period: (Math.random() * 2 + 3) * 60000,
          phase: Math.random() * Math.PI * 2,
        }),
      );
    }
  }

  tick(mouse, dt) {
    for (let star of this.stars) {
      star.phase =
        (star.phase + (dt / star.period) * Math.PI) % (Math.PI * 2);
      star.x = this.x + Math.cos(star.phase) * star.apsis;
      star.y = this.y + Math.sin(star.phase) * star.apsis;
    }
  }
}

class Simulation {
  constructor({ width, height, galaxies, maxStars }) {
    this.width = width;
    this.height = height;
    this.numGalaxies = galaxies;
    this.maxStars = maxStars;
  }

  init() {
    this.galaxies = [];
    const minStarDist = Math.min(this.width, this.height) / 5;
    const maxStarDist = minStarDist * 5;
    for (let i = 0; i < this.numGalaxies; i++) {
      const numStars = Math.floor((Math.random() / 2 + 0.5) * this.maxStars);
      const size = maxStarDist * (Math.random() / 2 + 0.5);
      this.galaxies.push(
        new Galaxy({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          min: minStarDist,
          size,
          stars: numStars,
        }),
      );
    }
  }

  tick(mouse, dt) {
    for (let galaxy of this.galaxies) {
      galaxy.tick(mouse, dt);
    }
  }
}

export class CanvasAdapter {
  constructor({ width, height, galaxies, maxStars }) {
    this.simulation = new Simulation({
      width,
      height,
      galaxies,
      maxStars,
    });
    this.simulation.init();
  }

  tick(mouse, dt) {
    if (!this.simulation) return;
    this.simulation.tick(mouse, dt);
  }

  updateSize(width, height) {
    this.simulation.width = width;
    this.simulation.height = height;
    this.simulation.init();
  }

  render(ctx) {
    if (!ctx) return;
    ctx.clearRect(0, 0, this.simulation.width, this.simulation.height);

    for (let galaxy of this.simulation.galaxies) {
      for (let star of galaxy.stars) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(star.x, star.y, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}
