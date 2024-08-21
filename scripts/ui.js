const cheats = require("cheat-codes/cheats")

function setupUI() {
    let overlaymarkerTable = Vars.ui.hudGroup.find("statustable");
    overlaymarkerTable.row();

    let tab = new Table();
    overlaymarkerTable.add(tab).bottom().left();

    tab.table(Tex.pane, t => {
        let b = new Button(Styles.none);
        let icon = new TextureRegionDrawable(Blocks.surgeWall.uiIcon);
        b.button(icon, () => {

        });
        t.add(b);

        t.clicked(() => {
            Vars.ui.showTextInput("", "Cheat", 32768, "", false, text => {
                cheats.cheatList.forEach(cheat => {
                    cheat.checkParityString(text)
                })
            })
        })
    })

    tab.visibility = () => {
        // return (Vars.ui.hudfrag.shown && Vars.mobile && !Vars.net.client() ? true : false)
        return (Vars.ui.hudfrag.shown && !Vars.net.client() ? true : false)
    }
}

module.exports = {
    setupUI: setupUI,
}