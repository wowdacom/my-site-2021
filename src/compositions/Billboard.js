import { fabric } from "fabric";

export var canvas = null;

export const initCanvas = (id, config) => {
  //   let scaleSize = config.scaleSize;
  canvas = new fabric.Canvas(id, config);
};

export const addText = (content, config) => {
  var comicSansText = new fabric.Text(content, config);

  canvas.add(comicSansText);
};

export const addImage = (content, config) => {
  fabric.Image.fromURL(content, function(oImg) {
    oImg.name = config.name;
    oImg.left = config.left - (oImg.width / 2) * config.scaleSize;
    oImg.top = config.top - (oImg.height / 2) * config.scaleSize;
    oImg.angle = 15;
    oImg.scale(config.scaleSize).set("flipX", true);
    oImg.filters.push(new fabric.Image.filters.Grayscale());
    oImg.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      bl: false,
      br: false,
      tl: false,
      tr: false,
      mtr: false,
    });
    if (config.isFilter) {
      oImg.applyFilters();
    }

    canvas.add(oImg);
  });
};
