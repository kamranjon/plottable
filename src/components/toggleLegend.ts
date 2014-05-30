///<reference path="../reference.ts" />

module Plottable {
  export class ToggleLegend extends Legend {
    private update: (d: any, b: boolean) => any;

    // if in state array, it is toggled on, otherwise, it is toggled off
    private state: any[];
    /**
     * Creates a ToggleLegend.
     *
     * @constructor
     * @param {ColorScale} colorScale
     * @param {(d: any, b: boolean) => any} update The callback function for clicking on a legend entry.
     * @param {any} update.d The legend entry.
     * @param {boolean} update.b The state that the entry has changed to.
     */
    constructor(colorScale: ColorScale, update: (d: any, b: boolean) => any) {
      super(colorScale);
      this.update = update;
      this.state = [];
      // initially, everything is toggled on
      colorScale.domain().forEach((d: any) => this.state.splice(0, 0, d));
    }

    public _doRender(): ToggleLegend {
      super._doRender();
      var dataSelection = this.content.selectAll("." + Legend._SUBELEMENT_CLASS);
      dataSelection.classed("toggled-on", (d: any) => this.state.indexOf(d) >= 0);
      dataSelection.classed("toggled-off", (d: any) => this.state.indexOf(d) < 0);
      dataSelection.on("click", (d: any, i: number) => {
        var index = this.state.indexOf(d);
        var isOn = index >= 0;
        if (isOn) { // remove it from state
          this.state.splice(index, 1);
        } else { // otherwise add it back in
          this.state.splice(0, 0, d);
        }
        this.update(d, !isOn);
      });
      return this;
    }
  }
}
