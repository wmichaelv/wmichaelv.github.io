window.addEventListener('load',function(e) {

  /* Scale Size */
  var scSize = .5;

  /************************
   * Collision Coordinate *
   *      4 by 5          *
   ************************/
  var coord =
    [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];

  /* Temporary Coordinate */
  var tempCoord = 
    [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];

  /* Movement Count */
  var moveCount = 0;

  /* Coordinate Variables */
  var nextX = 0;
  var nextY = 0;
  var wait = 0;

  var Q = window.Q = Quintus().include("Sprites, UI, Scenes, Input, Touch");

  Q.setup({width: 960, height: 900 })
    .controls()
    .touch();

  Q.Sprite.extend("BG",{
    init: function(p) {
      this._super(p, { asset: "boardGame.png", type: 0 });
    }
  });

  Q.Sprite.extend("SS",{
    init: function(p) {
      this._super(p, { asset: "smallSquare.png" });
      coord[fixPos(p.x)][fixPos(p.y)] = 1;
      this.on("drag");
    },
    drag: function(touch) {
      moveCheck();
      if (waiting())
        if (touch.dx < -20) {
          goTo("left", this, 0, 0);
          if (touch.dy < -20) {
            goTo("top", this, 0, 0);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 0, 0);
          }
        } else if (touch.dx > 20) {
          goTo("right", this, 0, 0);
          if (touch.dy < -20) {
            goTo("top", this, 0, 0);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 0, 0);
          }
        } else if (touch.dy < -20) {
          goTo("top", this, 0, 0);
          if (touch.dx < -20) {
            goTo("left", this, 0, 0);
          } else if (touch.dx > 20) {
            goTo("right", this, 0, 0);
          }
        } else if (touch.dy > 20) {
          goTo("bottom", this, 0, 0);
          if (touch.dx < -20) {
            goTo("left", this, 0, 0);
          } else if (touch.dx > 20) {
            goTo("right", this, 0, 0);
          }
        }
      /*
      if (this.p.x == 200 * scSize && this.p.y == 500 * scSize) {
        Q.stageScene("endGame",1, { label: "Congratulation!"});
      }
      */
    }
  });
  Q.Sprite.extend("LS",{
    init: function(p) {
      this._super(p, { asset: "largeSquare.png" });
      coord[fixPos(p.x, 50)][fixPos(p.y, 50)] = 1;
      coord[fixPos(p.x, 50)][fixPos(p.y, -50)] = 1;
      coord[fixPos(p.x, -50)][fixPos(p.y, 50)] = 1;
      coord[fixPos(p.x, -50)][fixPos(p.y, -50)] = 1;
      this.on("drag");
    },
    drag: function(touch) {
      moveCheck();
      if (waiting())
        if (touch.dx < -20) {
          goTo("left", this, 50, 50);
          if (touch.dy < -20) {
            goTo("top", this, 50, 50);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 50, 50);
          }
        } else if (touch.dx > 20) {
          goTo("right", this, 50, 50);
          if (touch.dy < -20) {
            goTo("top", this, 50, 50);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 50, 50);
          }
        } else if (touch.dy < -20) {
          goTo("top", this, 50, 50);
          if (touch.dx < -20) {
            goTo("left", this, 50, 50);
          } else if (touch.dx > 20) {
            goTo("right", this, 50, 50);
          }
        } else if (touch.dy > 20) {
          goTo("bottom", this, 50, 50);
          if (touch.dx < -20) {
            goTo("left", this, 50, 50);
          } else if (touch.dx > 20) {
            goTo("right", this, 50, 50);
          }
        }
      if (this.p.x == 250 * scSize && this.p.y == 350 * scSize) {
        Q.stageScene("endGame",1, { label: "Congratulation!"});
      }
    }
  });

  Q.Sprite.extend("HB",{
    init: function(p) {
      this._super(p, { asset: "horzBar.png" });
      coord[fixPos(p.x, 50)][fixPos(p.y)] = 1;
      coord[fixPos(p.x, -50)][fixPos(p.y)] = 1;
      this.on("drag");
    },
    drag: function(touch) {
      moveCheck();
      if (waiting())
        if (touch.dx < -20) {
          goTo("left", this, 50, 0);
          if (touch.dy < -20) {
            goTo("top", this, 50, 0);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 50, 0);
          }
        } else if (touch.dx > 20) {
          goTo("right", this, 50, 0);
          if (touch.dy < -20) {
            goTo("top", this, 50, 0);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 50, 0);
          }
        } else if (touch.dy < -20) {
          goTo("top", this, 50, 0);
          if (touch.dx < -20) {
            goTo("left", this, 50, 0);
          } else if (touch.dx > 20) {
            goTo("right", this, 50, 0);
          }
        } else if (touch.dy > 20) {
          goTo("bottom", this, 50, 0);
          if (touch.dx < -20) {
            goTo("left", this, 50, 0);
          } else if (touch.dx > 20) {
            goTo("right", this, 50, 0);
          }
        }
    }
  });

  Q.Sprite.extend("VB",{
    init: function(p) {
      this._super(p, { asset: "vertBar.png" });
      coord[fixPos(p.x)][fixPos(p.y, 50)] = 1;
      coord[fixPos(p.x)][fixPos(p.y, -50)] = 1;
      this.on("drag");
    },
    drag: function(touch) {
      moveCheck();
      if (waiting())
        if (touch.dx < -20) {
          goTo("left", this, 0, 50);
          if (touch.dy < -20) {
            goTo("top", this, 0, 50);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 0, 50);
          }
        } else if (touch.dx > 20) {
          goTo("right", this, 0, 50);
          if (touch.dy < -20) {
            goTo("top", this, 0, 50);
          } else if (touch.dy > 20) {
            goTo("bottom", this, 0, 50);
          }
        } else if (touch.dy < -20) {
          goTo("top", this, 0, 50);
          if (touch.dx < -20) {
            goTo("left", this, 0, 50);
          } else if (touch.dx > 20) {
            goTo("right", this, 0, 50);
          }
        } else if (touch.dy > 20) {
          goTo("bottom", this, 0, 50);
          if (touch.dx < -20) {
            goTo("left", this, 0, 50);
          } else if (touch.dx > 20) {
            goTo("right", this, 0, 50);
          }
        }
    }
  });

  function fixPos(coord, disposition) {
    if (disposition == null) disposition = 0;
    return ((coord + (disposition * scSize)) / (100 * scSize)) - 1;
  }

  function goTo(direction, object, wOffset, hOffset) {

    /**************************************************
     * offset is based on extra length from 100 x 100 *
     **************************************************/
    
    switch (direction) {
      case "left":
        if (hOffset != 0) {
          nextX = fixPos(object.p.x, -(100 + wOffset));
          nextY = fixPos(object.p.y, hOffset);
          if (checkFutureCollision(nextX, nextY)) {
            nextY = fixPos(object.p.y, -hOffset);
            if (checkFutureCollision(nextX, nextY)) {
              coord[nextX][nextY] = 1;
              nextY = fixPos(object.p.y, hOffset);
              coord[nextX][nextY] = 1;
              coord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, hOffset)] = 0;
              coord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, -hOffset)] = 0;
              object.p.x -= 100 * scSize;
              wait = 10;
            }
          }
        } else {
          nextX = fixPos(object.p.x, -(100 + wOffset));
          nextY = fixPos(object.p.y);
          if (checkFutureCollision(nextX, nextY)) {
            coord[nextX][nextY] = 1;
            coord[fixPos(object.p.x, wOffset)][fixPos(object.p.y)] = 0;
            object.p.x -= 100 * scSize;
            wait = 10;
          }
        }
        break;
      case "right":
        if (hOffset != 0) {
          nextX = fixPos(object.p.x, (100 + wOffset));
          nextY = fixPos(object.p.y, hOffset);
          if (checkFutureCollision(nextX, nextY)) {
            nextY = fixPos(object.p.y, -hOffset);
            if (checkFutureCollision(nextX, nextY)) {
              coord[nextX][nextY] = 1;
              nextY = fixPos(object.p.y, hOffset);
              coord[nextX][nextY] = 1;
              coord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, hOffset)] = 0;
              coord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, -hOffset)] = 0;
              object.p.x += 100 * scSize;
              wait = 10;
            }
          }
        } else {
          nextX = fixPos(object.p.x, (100 + wOffset));
          nextY = fixPos(object.p.y);
          if (checkFutureCollision(nextX, nextY)) {
            coord[nextX][nextY] = 1;
            coord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y)] = 0;
            object.p.x += 100 * scSize;
            wait = 10;
          }
        }
        break;
      case "top":
        if (wOffset != 0) {
          nextX = fixPos(object.p.x, wOffset);
          nextY = fixPos(object.p.y, -(100 + hOffset));
          if (checkFutureCollision(nextX, nextY)) {
            nextX = fixPos(object.p.x, -wOffset);
            if (checkFutureCollision(nextX, nextY)) {
              coord[nextX][nextY] = 1;
              nextX = fixPos(object.p.x, wOffset);
              coord[nextX][nextY] = 1;
              coord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, hOffset)] = 0;
              coord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, hOffset)] = 0;
              object.p.y -= 100 * scSize;
              wait = 10;
            }
          }
        } else {
          nextX = fixPos(object.p.x, wOffset);
          nextY = fixPos(object.p.y, -(100 + hOffset));
          if (checkFutureCollision(nextX, nextY)) {
            coord[nextX][nextY] = 1;
            coord[fixPos(object.p.x)][fixPos(object.p.y, hOffset)] = 0;
            object.p.y -= 100 * scSize;
            wait = 10;
          }
        }
        break;
      case "bottom":
        if (wOffset != 0) {
          nextX = fixPos(object.p.x, wOffset);
          nextY = fixPos(object.p.y, (100 + hOffset));
          if (checkFutureCollision(nextX, nextY)) {
            nextX = fixPos(object.p.x, -wOffset);
            if (checkFutureCollision(nextX, nextY)) {
              coord[nextX][nextY] = 1;
              nextX = fixPos(object.p.x, wOffset);
              coord[nextX][nextY] = 1;
              coord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, -hOffset)] = 0;
              coord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, -hOffset)] = 0;
              object.p.y += 100 * scSize;
              wait = 10;
            }
          }
        } else {
          nextX = fixPos(object.p.x, wOffset);
          nextY = fixPos(object.p.y, (100 + hOffset));
          if (checkFutureCollision(nextX, nextY)) {
            coord[nextX][nextY] = 1;
            coord[fixPos(object.p.x)][fixPos(object.p.y, -hOffset)] = 0;
            object.p.y += 100 * scSize;
            wait = 10;
          }
        }
        break;
      default:
        break;
    }
  }

  function checkFutureCollision(x, y) {
    console.log(coord);
    if (coord[x][y] == null) {
      console.log("unidentified : [" + (x + 1) + "]["+ (y + 1) + "]");
      return false;
    } else if (coord[x][y] == 1) {
      console.log("filled : [" + (x + 1) + "]["+ (y + 1) + "]");
      return false;
    } else {
      console.log("empty : [" + (x + 1) + "]["+ (y + 1) + "]");
      return true;
    }
  }

  /* Wait Counter for the next movement */
  function waiting() { return (wait > 0) ? !wait-- : true; }

  /* Refresh Coordinate to 0 */
  function resetMatrix4by5(matrix) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 5; j++)
          matrix[i][j] = 0;
    return;
  }

  /* Compare two matrix */
  function compareMatrix4by5(matrix1, matrix2) {
    for (var i = 0; i < 4; i++)
      for (var j = 0; j < 5; j++)
        if (matrix1[i][j] != matrix2[i][j]) return false;
    return true;
  }

  /* store matrix1 value into matrix2 */
  function duplicateMatrix4by5(matrix1, matrix2) {
    for (var i = 0; i < 4; i++)
      for (var j = 0; j < 5; j++)
        matrix2[i][j] = matrix1[i][j];
    return;
  }

  /* if the board changes, increment move count by 1 */
  function moveCheck() {
    if (!compareMatrix4by5(coord, tempCoord)) {
      duplicateMatrix4by5(coord, tempCoord);
      moveCount++;
      console.log("moveCount = ", moveCount);
    }
    return;
  }


  /* Executed Commands */

  Q.scene("startGame",function(stage) {  
    console.log("Begin");

    /* Refresh Coordinate to 0 */
    resetMatrix4by5(coord);
    resetMatrix4by5(tempCoord);

    /* Refresh movement counter to 0 */
    moveCount = 0;

    console.log("Pre-Object Implementation");
    console.log(coord);

    /* Implement Objects */
    var bg1 = stage.insert(new Q.BG({ x: 250 * scSize, y: 300 * scSize, z: 3, scale: scSize}));

    var ss1 = stage.insert(new Q.SS({ x: 100 * scSize, y: 500 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var ss2 = stage.insert(new Q.SS({ x: 200 * scSize, y: 400 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var ss3 = stage.insert(new Q.SS({ x: 300 * scSize, y: 400 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var ss4 = stage.insert(new Q.SS({ x: 400 * scSize, y: 500 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    var ls1 = stage.insert(new Q.LS({ x: 250 * scSize, y: 150 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    var hb1 = stage.insert(new Q.HB({ x: 250 * scSize, y: 300 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    var vb1 = stage.insert(new Q.VB({ x: 100 * scSize, y: 150 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var vb2 = stage.insert(new Q.VB({ x: 100 * scSize, y: 350 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var vb3 = stage.insert(new Q.VB({ x: 400 * scSize, y: 150 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var vb4 = stage.insert(new Q.VB({ x: 400 * scSize, y: 350 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    console.log("Post-Object Implementation");
    console.log(coord);
  });

  Q.scene('endGame',function(stage) {
    var box = stage.insert(new Q.UI.Container({
      x: 200, y: 200, fill: "rgba(0,0,0,0.5)"
    }));
    
    var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                             label: "Play Again" }))         
    var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                          label: stage.options.label }));
    button.on("click",function() {
      Q.clearStages();
      Q.stageScene('startGame');
    });
    box.fit(20);
  });

  Q.load("smallSquare.png, largeSquare.png, horzBar.png, vertBar.png, boardGame.png", function() {
    Q.stageScene("startGame");
  });

});