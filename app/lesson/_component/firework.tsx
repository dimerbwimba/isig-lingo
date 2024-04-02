import { useEffect } from 'react';
import { Anchor, Shape } from 'zdog';

export const Firework = () => {
  useEffect(() => {
    const element = document.querySelector('canvas');
    const context = element.getContext('2d');
    const { width, height } = element;
    const zoom = 5;

    const w = width / zoom;
    const h = height / zoom;
    const x = w / 2;
    const y = h / 2;

    const radius = w / 4;
    const number = 16;

    const PI = Math.PI;
    const TAU = PI * 2;
    const points = Array(number)
      .fill(null)
      .map((_, i, { length }) => {
        const theta = PI * -1 + (TAU / length) * i;
        const points = Array(number)
          .fill(null)
          .map((_, j, { length }) => {
            const a = PI * -1 + (TAU / length) * j;
            const x = radius * Math.sin(theta) * Math.cos(a);
            const y = radius * Math.sin(theta) * Math.sin(a);
            const z = radius * Math.cos(theta);

            return { x, y, z };
          });
        return points;
      })
      .flat();

    const colors = {
      firework: ['hsl(359 87% 74%)', 'hsl(209 95% 72%)', 'hsl(243 62% 76%)'],
    };

    const strokes = [0.4, 0.8];

    const root = new Anchor();

    const firework = new Anchor({ addTo: root });
    const particles = new Anchor({ addTo: firework });
    const trails = new Anchor({ addTo: particles });

    for (let i = 0; i < points.length; i++) {
      const { x, y, z } = points[i];
      if (i % 3 === 0) {
        new Shape({
          addTo: trails,
          color: colors.firework[0],
          stroke: strokes[0],
          path: [
            {
              x: x * 0.7,
              y: y * 0.7,
              z: z * 0.7,
            },
            {
              x: x * 0.95,
              y: y * 0.95,
              z: z * 0.95,
            },
          ],
        });
      }

      new Shape({
        addTo: particles,
        color: colors.firework[0],
        stroke: strokes[1],
        translate: {
          x: x,
          y: y,
          z: z,
        },
      });
    }

    context.lineCap = 'round';
    context.lineJoin = 'round';

    const render = () => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      context.scale(zoom, zoom);
      root.renderGraphCanvas(context);
      context.restore();
    };

    firework.rotate.x = 0.8 + Math.random() * 0.4;
    firework.rotate.y = Math.random() * TAU;

    root.updateGraph();
    render();

    const easeOutQuint = (x) => 1 - Math.pow(1 - x, 5);

    let dx = 1;
    let dy = 1;

    particles.scale = 0;
    trails.scale = 0;

    let frame = null;
    let ticker = 0;
    const cycle = 200;

    const animate = () => {
      ticker += 1;

      if (ticker >= cycle) {
        const color =
          colors.firework[Math.floor(Math.random() * colors.firework.length)];
        for (const child of [...particles.children.slice(1), ...trails.children]) {
          child.color = color;
        }

        dx = Math.random() > 0.5 ? 1 : -1;
        dy = Math.random() > 0.5 ? 1 : -1;

        firework.translate.x = Math.floor(Math.random() * (w - radius * 2)) - (w - radius * 2) / 2;
        firework.translate.y = Math.floor(Math.random() * (h - radius * 2)) - (h - radius * 2) / 2;

        firework.scale = 0.7 + Math.floor(Math.random() * 4) / 10;

        firework.rotate.x = 0.8 + Math.random() * 0.4;
        firework.rotate.y = Math.random() * TAU;

        ticker = ticker % cycle;
      }

      const ease = easeOutQuint(ticker / cycle);

      firework.rotate.x = (firework.rotate.x + 0.001 * dx) % TAU;
      firework.rotate.y = (firework.rotate.y + 0.001 * dy) % TAU;
      particles.scale = ease;
      trails.scale = ease;

      root.updateGraph();
      render();

      frame = requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      style={{ display: 'block', inlineSize: '100%', maxInlineSize: '200px' }}
      width="400"
      height="400"
    ></canvas>
  );
};
