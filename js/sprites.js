(function (Quintus) {

  window.addEventListener('load', function (e) {
    // 指定 Quintus 的圖片載入路徑
    var imagePath = 'http://i.imgbox.com/';
    var imgs = {
      'penguin': 'accGoAZk.png',
      'pocket': 'acreqNWZ.png'
    };

    // Create a new engine instance
    var Q = Quintus({
      imagePath: imagePath
    })
    // Load any needed modules
    .include("Sprites")
    // Add a canvas element onto the page
    .setup();

    Q.Sprite.extend("Player", {
      init: function (p) {
        this._super(p, {
          hitPoints: 10,
          damage: 5,
          x: 5,
          y: 1
        });
      }
    });

    var player1 = new Q.Player();

    console.log(player1.p.hitPoints); // 10
    console.log(player1.p.damage); // 5

    Q.Sprite.extend("Penguin", {
      init: function (p) {
        this._super({
          x: 100,
          y: 100,
          asset: imgs.penguin
        });
      },
      step: function (dt) {
        // do something for every setp
      }
    });

    Q.Sprite.extend("Square", {
      init: function (p) {
        this._super(p, {
          color: "red",
          w: 50,
          h: 50
        });
      },

      draw: function (ctx) {
        ctx.fillStyle = this.p.color;
        // Draw a filled rectangle centered at
        // 0,0 (i.e. from -w/2,-h2 to w/2, h/2
        ctx.fillRect(this.p.cx, this.p.cy, this.p.w, this.p.h);
      }
    });

    // Make sure penguin.png is loaded
    Q.load([imgs.penguin, imgs.pocket], function () {

      Q.sheet("pocket", imgs.pocket, {
        tilew: 80, // Each tile is 80 pixels wide
        tileh: 80 // and 80 pixels tall
      });

      Q.Sprite.extend("Pocket", {
        init: function (p) {
          this._super({
            x: 100,
            y: 250,
            sheet: "pocket",
            frame: 0
          });
        }
      });

      var penguin = new Q.Penguin();
      var pocket = new Q.Pocket();
      var square = new Q.Square({
        cx: 90,
        cy: 350,
        w: 25,
        h: 25
      });

      Q.gameLoop(function (dt) {
        Q.clear();

        penguin.step(dt);
        penguin.render(Q.ctx);

        pocket.render(Q.ctx);

        Q.sheet("pocket").draw(Q.ctx, 100, 320, 1);

        square.draw(Q.ctx);
      });
    });
  });

})(window.Quintus);