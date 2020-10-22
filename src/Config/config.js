/**
 * @Date 2020-10-15
 * @Author William Pépin
 * @Desc Constante déterminant les options des composantes react des graphs avec une hauteur de 300px Pour la documentation des champs, voir https://visjs.github.io/vis-network/docs/network/.
 */
const options300 = {
  layout: {
    hierarchical: false,
    randomSeed: 1,
  },

  physics: {
    enabled: false,
  },
  edges: {
    color: "#000000",
    arrows: {
      to: false,
    },
  },
  height: "300px",
};

/**
 * @Date 2020-10-15
 * @Author William Pépin
 * @Desc Constante déterminant les options des composantes react des graphs avec une hauteur de 600px. Pour la documentation des champs, voir https://visjs.github.io/vis-network/docs/network/.
 */
const options600 = {
  layout: {
    hierarchical: false,
    randomSeed: 20,
  },
  nodes: {
    shape: "square",
    size: 45,
  },
  physics: {
    enabled: false,
  },
  edges: {
    color: "#000000",
    arrows: {
      to: false,
    },
  },
  height: "600px",
};

export { options300, options600 };
