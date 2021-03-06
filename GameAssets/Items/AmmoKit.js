"use strict";
var doomClone;
(function (doomClone) {
    var f = FudgeCore;
    class AmmoKit extends doomClone.Item {
        constructor(player, x, z) {
            super(player, "Ammo", x, z, document.getElementById("ammo"));
            this.ammoAmount = 10;
            this.checkCollision = () => {
                if (this.getIsColliding()) {
                    this.getPlayer().setAmmo(this.ammoAmount);
                    f.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.checkCollision);
                    this.removeSelf();
                }
            };
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.checkCollision);
        }
    }
    doomClone.AmmoKit = AmmoKit;
})(doomClone || (doomClone = {}));
//# sourceMappingURL=AmmoKit.js.map