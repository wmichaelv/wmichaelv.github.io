window.addEventListener('load',function(e) {

  /* Scale Size */
  var scSize = .5;

  /************************
   * Collision Coordinate *
   *      4 by 5          *
   ************************/
  var currCoord =
    [
      ["0","0","0","0","0"],
      ["0","0","0","0","0"],
      ["0","0","0","0","0"],
      ["0","0","0","0","0"]
    ];

  /* Previous Coordinate */
  var prevCoord = 
    [
      ["0","0","0","0","0"],
      ["0","0","0","0","0"],
      ["0","0","0","0","0"],
      ["0","0","0","0","0"]
    ];

  /* Temp Coordinate For Undo Purpose */ 
  var tempCoord = 
    [
      ["0","0","0","0","0"],
      ["0","0","0","0","0"],
      ["0","0","0","0","0"],
      ["0","0","0","0","0"]
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
      currCoord[fixPos(p.x)][fixPos(p.y)] = String(this.p.name);
      this.on("drag");
      this.on("touchEnd");

    },
    drag: function(touch) {
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
      //Quick win
      if (this.p.x == 300 * scSize && this.p.y == 500 * scSize) {
        Q.stageScene("endGame",1, { label: "Congratulation!"});
      }
      */
      
    },
    touchEnd: function(touch) {
      moveCheck();
    }
  });
  Q.Sprite.extend("LS",{
    init: function(p) {
      this._super(p, { asset: "largeSquare.png" });
      currCoord[fixPos(p.x, 50)][fixPos(p.y, 50)] = String(this.p.name);
      currCoord[fixPos(p.x, 50)][fixPos(p.y, -50)] = String(this.p.name);
      currCoord[fixPos(p.x, -50)][fixPos(p.y, 50)] = String(this.p.name);
      currCoord[fixPos(p.x, -50)][fixPos(p.y, -50)] = String(this.p.name);
      this.on("drag");
      this.on("touchEnd");
    },
    drag: function(touch) {
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
    },
    touchEnd: function(touch) {
      moveCheck();
    }
  });

  Q.Sprite.extend("HB",{
    init: function(p) {
      this._super(p, { asset: "horzBar.png" });
      currCoord[fixPos(p.x, 50)][fixPos(p.y)] = String(this.p.name);
      currCoord[fixPos(p.x, -50)][fixPos(p.y)] = String(this.p.name);
      this.on("drag");
      this.on("touchEnd");
    },
    drag: function(touch) {
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
    },
    touchEnd: function(touch) {
      moveCheck();
    }
  });

  Q.Sprite.extend("VB",{
    init: function(p) {
      this._super(p, { asset: "vertBar.png" });
      currCoord[fixPos(p.x)][fixPos(p.y, 50)] = String(this.p.name);
      currCoord[fixPos(p.x)][fixPos(p.y, -50)] = String(this.p.name);
      this.on("drag");
      this.on("touchEnd");
    },
    drag: function(touch) {
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
    },
    touchEnd: function(touch) {
      moveCheck();
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
              currCoord[nextX][nextY] = String(object.p.name);
              nextY = fixPos(object.p.y, hOffset);
              currCoord[nextX][nextY] = String(object.p.name);
              currCoord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, hOffset)] = "0";
              currCoord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, -hOffset)] = "0";
              object.p.x -= 100 * scSize;
              wait = 40;
            }
          }
        } else {
          nextX = fixPos(object.p.x, -(100 + wOffset));
          nextY = fixPos(object.p.y);
          if (checkFutureCollision(nextX, nextY)) {
            currCoord[nextX][nextY] = String(object.p.name);
            currCoord[fixPos(object.p.x, wOffset)][fixPos(object.p.y)] = "0";
            object.p.x -= 100 * scSize;
            wait = 40;
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
              currCoord[nextX][nextY] = String(object.p.name);
              nextY = fixPos(object.p.y, hOffset);
              currCoord[nextX][nextY] = String(object.p.name);
              currCoord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, hOffset)] = "0";
              currCoord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, -hOffset)] = "0";
              object.p.x += 100 * scSize;
              wait = 40;
            }
          }
        } else {
          nextX = fixPos(object.p.x, (100 + wOffset));
          nextY = fixPos(object.p.y);
          if (checkFutureCollision(nextX, nextY)) {
            currCoord[nextX][nextY] = String(object.p.name);
            currCoord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y)] = "0";
            object.p.x += 100 * scSize;
            wait = 40;
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
              currCoord[nextX][nextY] = String(object.p.name);
              nextX = fixPos(object.p.x, wOffset);
              currCoord[nextX][nextY] = String(object.p.name);
              currCoord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, hOffset)] = "0";
              currCoord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, hOffset)] = "0";
              object.p.y -= 100 * scSize;
              wait = 40;
            }
          }
        } else {
          nextX = fixPos(object.p.x, wOffset);
          nextY = fixPos(object.p.y, -(100 + hOffset));
          if (checkFutureCollision(nextX, nextY)) {
            currCoord[nextX][nextY] = String(object.p.name);
            currCoord[fixPos(object.p.x)][fixPos(object.p.y, hOffset)] = "0";
            object.p.y -= 100 * scSize;
            wait = 40;
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
              currCoord[nextX][nextY] = String(object.p.name);
              nextX = fixPos(object.p.x, wOffset);
              currCoord[nextX][nextY] = String(object.p.name);
              currCoord[fixPos(object.p.x, wOffset)][fixPos(object.p.y, -hOffset)] = "0";
              currCoord[fixPos(object.p.x, -wOffset)][fixPos(object.p.y, -hOffset)] = "0";
              object.p.y += 100 * scSize;
              wait = 40;
            }
          }
        } else {
          nextX = fixPos(object.p.x, wOffset);
          nextY = fixPos(object.p.y, (100 + hOffset));
          if (checkFutureCollision(nextX, nextY)) {
            currCoord[nextX][nextY] = String(object.p.name);
            currCoord[fixPos(object.p.x)][fixPos(object.p.y, -hOffset)] = "0";
            object.p.y += 100 * scSize;
            wait = 40;
          }
        }
        break;
      default:
        break;
    }
  }

  function checkFutureCollision(x, y) {
    //console.log(currCoord);
    if (currCoord[x][y] == null) {
      /* Print Coordinate */ 
      //console.log("unidentified : [" + (x + 1) + "]["+ (y + 1) + "]");
      return false;
    } else if (currCoord[x][y] != "0") {
      //console.log("filled : [" + (x + 1) + "]["+ (y + 1) + "]");
      return false;
    } else {
      //console.log("empty : [" + (x + 1) + "]["+ (y + 1) + "]");
      return true;
    }
  }

  /* Wait Counter for the next movement */
  function waiting() { return (wait > 0) ? !wait-- : true; }

  /* Refresh Coordinate to 0 */
  function resetMatrix4by5(matrix) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 5; j++)
          matrix[i][j] = "0";
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
    if (!compareMatrix4by5(currCoord, prevCoord)) {
      duplicateMatrix4by5(prevCoord, tempCoord);
      duplicateMatrix4by5(currCoord, prevCoord);
      moveCount++;
      var moveText = Q("UI.Text").first();
      moveText.p.label = "Moves: " + moveCount.toString();
      //undoFlag = true;
      if (moveCount > 1) Q("UI.Container").at(0).p.hidden = false;
    }
    return;
  }

  function undo() {
    if (moveCount == 0) return;
    if (Q("UI.Container").at(0).p.hidden == true) return;
    duplicateMatrix4by5(tempCoord, currCoord);
    duplicateMatrix4by5(tempCoord, prevCoord);

    applyCoordinate(currCoord);

    moveCount--;
    var moveText = Q("UI.Text").first();
    moveText.p.label = "Moves: " + moveCount.toString();
    Q("UI.Container").at(0).p.hidden = true;
  }

  function applyCoordinate(matrix) {

    /* Object Counters */
    var ssCounter = 0;
    var lsCounter = 0;
    var hbCounter = 0;
    var vbCounter = 0;

    /* Scan Coord And Apply Position */
    for (var i = 0; i < 4 ; i++)
      for (var j = 0; j < 5; j++)
      
        switch (matrix[i][j]) {
        case "ss":
          Q("SS").at(ssCounter).p.x = coordToPos(i);
          Q("SS").at(ssCounter).p.y = coordToPos(j);
          ssCounter++;
          break;
        case "ls":
          Q("LS").at(lsCounter).p.x = coordToPos(i + 0.5);
          Q("LS").at(lsCounter).p.y = coordToPos(j + 0.5);
          lsCounter++;
          matrix[i][j + 1] = "lscounter";
          matrix[i + 1][j] = "lscounter";
          matrix[i + 1][j + 1] = "lscounter";
          break;
        case "lscounter":
           matrix[i][j] = "ls";
          break;
        case "hb":
          if (hbCounter < 1) {
            Q("HB").at(hbCounter).p.x = coordToPos(i + 0.5);
            Q("HB").at(hbCounter).p.y = coordToPos(j);
            hbCounter++;
          }
          matrix[i + 1][j] = "hbcounter";
          break;
        case "hbcounter":
           matrix[i][j] = "hb";
          break;
        case "vb":
          if (vbCounter < 4) {
            Q("VB").at(vbCounter).p.x = coordToPos(i);
            Q("VB").at(vbCounter).p.y = coordToPos(j + 0.5);
            vbCounter++;
            matrix[i][j + 1] = "vbcounter";
          }
          break;
        case "vbcounter":
          matrix[i][j] = "vb";
          break;
        default:
          matrix[i][j] = "0";
          break;
        }
  }

  function coordToPos(pos) {
    return ((pos + 1) * (100 * scSize));
  }

  /* Executed Commands */

  Q.scene("startGame",function(stage) {  
    /* Start Testing */
    //console.log(coordToPos(2));

    /* End Testing */

    console.log("Begin");

    /* Refresh Coordinate to 0 */
    resetMatrix4by5(currCoord);
    resetMatrix4by5(prevCoord);

    /* Refresh movement counter to 0 */
    moveCount = 0;

    console.log("Pre-Object Implementation");
    console.log(currCoord);

    /* Implement Objects */
    var bg1 = stage.insert(new Q.BG({ name: "bg", x: 250 * scSize, y: 300 * scSize, z: 3, scale: scSize}));

    var ss1 = stage.insert(new Q.SS({ name: "ss", x: 100 * scSize, y: 500 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var ss2 = stage.insert(new Q.SS({ name: "ss", x: 200 * scSize, y: 400 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var ss3 = stage.insert(new Q.SS({ name: "ss", x: 300 * scSize, y: 400 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var ss4 = stage.insert(new Q.SS({ name: "ss", x: 400 * scSize, y: 500 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    var ls1 = stage.insert(new Q.LS({ name: "ls", x: 250 * scSize, y: 150 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    var hb1 = stage.insert(new Q.HB({ name: "hb", x: 250 * scSize, y: 300 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    var vb1 = stage.insert(new Q.VB({ name: "vb", x: 100 * scSize, y: 150 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var vb2 = stage.insert(new Q.VB({ name: "vb", x: 100 * scSize, y: 350 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var vb3 = stage.insert(new Q.VB({ name: "vb", x: 400 * scSize, y: 150 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));
    var vb4 = stage.insert(new Q.VB({ name: "vb", x: 400 * scSize, y: 350 * scSize, z: 2, scale: scSize, type: Q.SPRITE_UI}));

    /* Duplicate Matrix After Object Initialization */
    duplicateMatrix4by5(currCoord, prevCoord);

    /* Undo Box */
    var undoBox = stage.insert(new Q.UI.Container({
      fill: "gray",
      border: 5,
      y: 125,
      x: Q.width/3,
      hidden: true
    }));
    
    /* Undo Button */
    var undoButton = undoBox.insert(new Q.UI.Button({ 
      label: " Undo  ", fontColor: "white", x: 0, y: 0, font: "800 24px Arial" }))
    undoButton.on("click",function() {
      undo();
    });
    undoBox.fit(20);

    /* Reset Box */
    var resetBox = stage.insert(new Q.UI.Container({
      fill: "gray",
      border: 5,
      y: 225,
      x: Q.width/3
    }));
    
    /* Reset Button */
    var resetButton = resetBox.insert(new Q.UI.Button({ 
      label: " Reset  ", fontColor: "white", x: 0, y: 0, font: "800 24px Arial" }))
    resetButton.on("click",function() {
      Q.clearStages();
      Q.stageScene('startGame');
    });
    resetBox.fit(20);

    /* Move Count Box */
    var moveCountBox = stage.insert(new Q.UI.Container({
      fill: "gray",
      border: 5,
      y: 325,
      x: Q.width/3
    }));
    stage.insert(new Q.UI.Text({ 
      label: "Moves: " + moveCount.toString(),
      color: "white",
      x: 0,
      y: 0
    }),moveCountBox);
    moveCountBox.fit(20,20);

    console.log("Post-Object Implementation");
    console.log(currCoord);
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