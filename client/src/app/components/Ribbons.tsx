'use client';
import React, { useEffect } from 'react';

// Define interfaces for our types
interface IPoint {
  x: number;
  y: number;
  set(x?: number, y?: number): void;
  copy(point: IPoint): IPoint;
  multiply(x?: number, y?: number): IPoint;
  divide(x?: number, y?: number): IPoint;
  add(x?: number, y?: number): IPoint;
  subtract(x?: number, y?: number): IPoint;
  clampX(min: number, max: number): IPoint;
  clampY(min: number, max: number): IPoint;
  flipX(): IPoint;
  flipY(): IPoint;
}

interface IRibbonSection {
  point1: IPoint;
  point2: IPoint;
  point3: IPoint;
  color: number;
  delay: number;
  dir: 'left' | 'right';
  alpha: number;
  phase: number;
}

interface IRibbonOptions {
  colorSaturation: string;
  colorBrightness: string;
  colorAlpha: number;
  colorCycleSpeed: number;
  verticalPosition: 'top' | 'min' | 'middle' | 'center' | 'bottom' | 'max' | 'random';
  horizontalSpeed: number;
  ribbonCount: number;
  strokeSize: number;
  parallaxAmount: number;
  animateSections: boolean;
}

interface IFactory {
  _canvas: HTMLCanvasElement | null;
  _context: CanvasRenderingContext2D | null;
  _sto: number | null;
  _width: number;
  _height: number;
  _scroll: number;
  _ribbons: Array<IRibbonSection[] | null>;
  _options: IRibbonOptions;
  _onDraw: () => void;
  _onResize: (e?: Event) => void;
  _onScroll: (e?: Event) => void;
  setOptions(options: Partial<IRibbonOptions>): void;
  init(): void;
  addRibbon(): void;
  _drawRibbonSection(section: IRibbonSection): boolean;
}

// Define types for window augmentation
declare global {
  interface Window {
    Ribbons: {
      new (options?: Partial<IRibbonOptions>): IFactory;
      prototype: IFactory;
      _instance?: IFactory;
    };
  }
}

const Ribbons: React.FC = () => {
  useEffect(() => {
    // Define the Ribbons class
    const defineRibbons = () => {
      if (typeof window === 'object') {
        const RibbonsClass = function() {
          const _w = window,
            _b = document.body,
            _d = document.documentElement;

          // random helper
          const random = function(...args: number[]): number {
            if (args.length === 1) {
              // only 1 argument
              if (Array.isArray(args[0])) {
                // extract index from array
                const index = Math.round(random(0, args[0].length - 1));
                return args[0][index] as number;
              }
              return random(0, args[0]); // assume numeric
            } else if (args.length === 2) {
              // two arguments range
              return Math.random() * (args[1] - args[0]) + args[0];
            } else if (args.length === 4) {
              const array = [args[0], args[1], args[2], args[3]];
              return array[Math.floor(Math.random() * array.length)];
            }
            return 0; // default
          };

          // screen helper
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          const screenInfo = function(_e?: Event) {
            const width = Math.max(
                0,
                _w.innerWidth || _d.clientWidth || _b.clientWidth || 0
              ),
              height = Math.max(
                0,
                _w.innerHeight || _d.clientHeight || _b.clientHeight || 0
              ),
              scrollx =
                Math.max(0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0) -
                (_d.clientLeft || 0),
              scrolly =
                Math.max(0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0) -
                (_d.clientTop || 0);

            return {
              width: width,
              height: height,
              ratio: width / height,
              centerx: width / 2,
              centery: height / 2,
              scrollx: scrollx,
              scrolly: scrolly
            };
          };

          // point object
          const Point = function(this: IPoint, x?: number, y?: number) {
            this.x = 0;
            this.y = 0;
            this.set(x, y);
          } as unknown as { new(x?: number, y?: number): IPoint };
          
          Point.prototype = {
            constructor: Point,

            set: function(x?: number, y?: number): void {
              this.x = x || 0;
              this.y = y || 0;
            },
            copy: function(point: IPoint): IPoint {
              this.x = point.x || 0;
              this.y = point.y || 0;
              return this;
            },
            multiply: function(x?: number, y?: number): IPoint {
              this.x *= x || 1;
              this.y *= y || 1;
              return this;
            },
            divide: function(x?: number, y?: number): IPoint {
              this.x /= x || 1;
              this.y /= y || 1;
              return this;
            },
            add: function(x?: number, y?: number): IPoint {
              this.x += x || 0;
              this.y += y || 0;
              return this;
            },
            subtract: function(x?: number, y?: number): IPoint {
              this.x -= x || 0;
              this.y -= y || 0;
              return this;
            },
            clampX: function(min: number, max: number): IPoint {
              this.x = Math.max(min, Math.min(this.x, max));
              return this;
            },
            clampY: function(min: number, max: number): IPoint {
              this.y = Math.max(min, Math.min(this.y, max));
              return this;
            },
            flipX: function(): IPoint {
              this.x *= -1;
              return this;
            },
            flipY: function(): IPoint {
              this.y *= -1;
              return this;
            }
          };

          // Actual Factory class constructor
          const Factory = function(this: IFactory, options?: Partial<IRibbonOptions>) {
            // Init properties
            this._canvas = null;
            this._context = null;
            this._sto = null;
            this._width = 0;
            this._height = 0;
            this._scroll = 0;
            this._ribbons = [];
            this._options = {
              // ribbon color HSL saturation amount
              colorSaturation: '80%',
              // ribbon color HSL brightness amount
              colorBrightness: '60%',
              // ribbon color opacity amount
              colorAlpha: 0.65,
              // how fast to cycle through colors in the HSL color space
              colorCycleSpeed: 6,
              // where to start from on the Y axis on each side (top|min, middle|center, bottom|max, random)
              verticalPosition: 'center',
              // how fast to get to the other side of the screen
              horizontalSpeed: 150,
              // how many ribbons to keep on screen at any given time
              ribbonCount: 3,
              // add stroke along with ribbon fill colors
              strokeSize: 0,
              // move ribbons vertically by a factor on page scroll
              parallaxAmount: -0.5,
              // add animation effect to each ribbon section over time
              animateSections: true
            };
            this._onDraw = this._onDraw.bind(this);
            this._onResize = this._onResize.bind(this);
            this._onScroll = this._onScroll.bind(this);
            this.setOptions(options || {});
            this.init();
          };

          // class prototype
          Factory.prototype = {
            constructor: Factory,

            // Set and merge local options
            setOptions: function(options?: Partial<IRibbonOptions>): void {
              if (typeof options === 'object' && options !== null) {
                Object.keys(options).forEach((key) => {
                  if (key in this._options && key in options) {
                    const typedKey = key as keyof IRibbonOptions;
                    this._options[typedKey] = options[typedKey];
                  }
                });
              }
            },

            // Initialize the ribbons effect
            init: function(): void {
              try {
                this._canvas = document.createElement('canvas');
                this._canvas.style.display = 'block';
                this._canvas.style.position = 'fixed';
                this._canvas.style.margin = '0';
                this._canvas.style.padding = '0';
                this._canvas.style.border = '0';
                this._canvas.style.outline = '0';
                this._canvas.style.left = '0';
                this._canvas.style.top = '0';
                this._canvas.style.width = '100%';
                this._canvas.style.height = '100%';
                this._canvas.style.zIndex = '-1';
                this._onResize();

                this._context = this._canvas.getContext('2d');
                if (this._context && this._canvas) {
                  this._context.clearRect(0, 0, this._width, this._height);
                  this._context.globalAlpha = this._options.colorAlpha;
                }

                window.addEventListener('resize', this._onResize);
                window.addEventListener('scroll', this._onScroll);
                document.body.appendChild(this._canvas);
              } catch (e) {
                console.warn('Canvas Context Error:', e instanceof Error ? e.message : String(e));
                return;
              }
              this._onDraw();
            },

            // Create a new random ribbon and to the list
            addRibbon: function() {
              // movement data
              const dir = Math.round(random(1, 9)) > 5 ? 'right' : 'left';
              let stop = 1000;
              const hide = 200;
              const min = 0 - hide;
              const max = this._width + hide;
              const startx = dir === 'right' ? min : max;
              let starty = Math.round(random(0, this._height));

              // adjust starty based on options
              if (/^(top|min)$/i.test(this._options.verticalPosition)) {
                starty = 0 + hide;
              } else if (/^(middle|center)$/i.test(this._options.verticalPosition)) {
                starty = this._height / 2;
              } else if (/^(bottom|max)$/i.test(this._options.verticalPosition)) {
                starty = this._height - hide;
              }

              // ribbon sections data
              const ribbon: IRibbonSection[] = [];
              const point1 = new Point(startx, starty);
              const point2 = new Point(startx, starty);
              let point3: IPoint;
              const color = Math.round(random(35, 35, 40, 40));
              let delay = 0;

              // builds ribbon sections
              while (true) {
                if (stop <= 0) break;
                stop--;

                const movex = Math.round(
                  (Math.random() * 1 - 0.2) * this._options.horizontalSpeed
                );
                const movey = Math.round((Math.random() * 1 - 0.5) * (this._height * 0.25));

                point3 = new Point();
                point3.copy(point2);

                if (dir === 'right') {
                  point3.add(movex, movey);
                  if (point2.x >= max) break;
                } else {
                  point3.subtract(movex, movey);
                  if (point2.x <= min) break;
                }

                ribbon.push({
                  point1: new Point(point1.x, point1.y),
                  point2: new Point(point2.x, point2.y),
                  point3,
                  color,
                  delay,
                  dir,
                  alpha: 0,
                  phase: 0
                });

                point1.copy(point2);
                point2.copy(point3);

                delay += 4;
              }

              this._ribbons.push(ribbon);
            },

            // Draw single section
            _drawRibbonSection: function(section: IRibbonSection): boolean {
              if (!section || !this._context) return false;

              if (section.phase >= 1 && section.alpha <= 0) {
                return true; // done
              }

              if (section.delay <= 0) {
                section.phase += 0.02;
                section.alpha = Math.sin(section.phase) * 1;
                section.alpha = section.alpha <= 0 ? 0 : section.alpha;
                section.alpha = section.alpha >= 1 ? 1 : section.alpha;

                if (this._options.animateSections) {
                  const mod = Math.sin(1 + section.phase * Math.PI / 2) * 0.1;

                  if (section.dir === 'right') {
                    section.point1.add(mod, 0);
                    section.point2.add(mod, 0);
                    section.point3.add(mod, 0);
                  } else {
                    section.point1.subtract(mod, 0);
                    section.point2.subtract(mod, 0);
                    section.point3.subtract(mod, 0);
                  }
                  section.point1.add(0, mod);
                  section.point2.add(0, mod);
                  section.point3.add(0, mod);
                }
              } else {
                section.delay -= 0.5;
              }

              const s = this._options.colorSaturation;
              const l = this._options.colorBrightness;
              const c = `hsla(${section.color}, ${s}, ${l}, ${section.alpha})`;

              this._context.save();

              if (this._options.parallaxAmount !== 0) {
                this._context.translate(0, this._scroll * this._options.parallaxAmount);
              }

              this._context.beginPath();
              this._context.moveTo(section.point1.x, section.point1.y);
              this._context.lineTo(section.point2.x, section.point2.y);
              this._context.lineTo(section.point3.x, section.point3.y);
              this._context.fillStyle = c;
              this._context.fill();

              if (this._options.strokeSize > 0) {
                this._context.lineWidth = this._options.strokeSize;
                this._context.strokeStyle = c;
                this._context.lineCap = 'round';
                this._context.stroke();
              }

              this._context.restore();
              return false; // not done yet
            },

            // Draw ribbons
            _onDraw: function(): void {
              if (!this._context) return;

              // cleanup on ribbons list to remove finished ribbons
              for (let i = 0; i < this._ribbons.length; i++) {
                if (!this._ribbons[i]) {
                  this._ribbons.splice(i, 1);
                  i--;
                }
              }

              // draw new ribbons
              this._context.clearRect(0, 0, this._width, this._height);

              for (let a = 0; a < this._ribbons.length; ++a) {
                const ribbon = this._ribbons[a];
                if (!ribbon) continue;

                const numSections = ribbon.length;
                let numDone = 0;

                for (let b = 0; b < numSections; ++b) {
                  if (this._drawRibbonSection(ribbon[b])) {
                    numDone++;
                  }
                }

                if (numDone >= numSections) {
                  this._ribbons[a] = null;
                }
              }

              if (this._ribbons.length < this._options.ribbonCount) {
                this.addRibbon();
              }

              requestAnimationFrame(this._onDraw);
            },

            // Update container size info
            _onResize: function(e?: Event): void {
              const screen = screenInfo(e);
              this._width = screen.width;
              this._height = screen.height;

              if (this._canvas) {
                this._canvas.width = this._width;
                this._canvas.height = this._height;

                if (this._context) {
                  this._context.globalAlpha = this._options.colorAlpha;
                }
              }
            },

            // Update container size info
            _onScroll: function(e?: Event): void {
              const screen = screenInfo(e);
              this._scroll = screen.scrolly;
            }
          };

          return Factory;
        }();

        // Assign the class to window.Ribbons with proper typing
        window.Ribbons = RibbonsClass as unknown as Window['Ribbons'];
      }
    };

    // Initialize CSS for background
    const applyBackgroundStyles = () => {
      document.body.style.backgroundColor = '#403060';
      document.body.style.backgroundImage = 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)';
      document.body.style.backgroundPosition = 'center center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundSize = 'cover';
    };

    // Initialize everything
    const setupRibbons = () => {
      applyBackgroundStyles();
      defineRibbons();
      
      if (typeof window['Ribbons'] === 'function') {
        const ribbons = new window['Ribbons']({
          colorSaturation: '60%',
          colorBrightness: '50%',
          colorAlpha: 0.5,
          colorCycleSpeed: 5,
          verticalPosition: 'random',
          horizontalSpeed: 200,
          ribbonCount: 3,
          strokeSize: 0,
          parallaxAmount: -0.2,
          animateSections: true
        });
        window.Ribbons._instance = ribbons;
      }
    };

    // Run setup
    setupRibbons();

    // Cleanup function
    return () => {
      // Find and remove the canvas element if it exists
      const canvasElement = document.querySelector('canvas');
      if (canvasElement) {
        canvasElement.remove();
      }
      
      // Clean up event listeners if Ribbons was initialized
      const instance = window.Ribbons?._instance;
      if (instance) {
        window.removeEventListener('resize', instance._onResize);
        window.removeEventListener('scroll', instance._onScroll);
        window.Ribbons._instance = undefined;
      }
    };
  }, []);

  return null; // Component doesn't render any visible elements itself
};

export default Ribbons;