export const PRODUCTS = [
  {
    id: "p1",
    title: "Aurelia Chair",
    category: "chair",

    price: {
      current: 120,
      original: 160,
      discountPercent: 25,
    },

    badges: {
      isNew: false,
    },

    images: {
      main: new URL(
        "../../assets/images/products/chairs/chair-01/chair-01-1.png",
        import.meta.url,
      ).href,
      gallery: [
        new URL(
          "../../assets/images/products/chairs/chair-01/chair-01-2.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-01/chair-01-3.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-01/chair-01-4.png",
          import.meta.url,
        ).href,
      ],
    },

    shortDescription: "Soft comfort with modern design",

    properties: {
      salesPackage: "1 Chair",
      modelNumber: "AUR-CHR-01",
      secondaryMaterial: "Metal",
      configuration: "Straight",
      fillingMaterial: "Foam",
      maximumLoadCapacity: "120 kg",
      originOfManufacture: "Serbia",
      dimensions: {
        width: "60 cm",
        height: "85 cm",
        depth: "55 cm",
        weight: "8 kg",
      },
      warrantySummary: "1 Year Manufacturer Warranty",
    },
  },
  {
    id: "p2",
    title: "Nordic",
    category: "chair",

    price: {
      current: 160,
      original: null,
      discountPercent: 0,
    },

    badges: {
      isNew: true,
    },

    images: {
      main: new URL(
        "../../assets/images/products/chairs/chair-02/chair-02-1.png",
        import.meta.url,
      ).href,
      gallery: [
        new URL(
          "../../assets/images/products/chairs/chair-02/chair-02-2.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-02/chair-02-3.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-02/chair-02-4.png",
          import.meta.url,
        ).href,
      ],
    },

    shortDescription: "Minimal form",

    properties: {
      salesPackage: "1 Chair",
      modelNumber: "AUR-CHR-01",
      secondaryMaterial: "Metal",
      configuration: "Straight",
      fillingMaterial: "Foam",
      maximumLoadCapacity: "120 kg",
      originOfManufacture: "Serbia",
      dimensions: {
        width: "60 cm",
        height: "85 cm",
        depth: "55 cm",
        weight: "8 kg",
      },
      warrantySummary: "1 Year Manufacturer Warranty",
    },
  },
  {
    id: "p3",
    title: "Lunara",
    category: "chair",

    price: {
      current: 80,
      original: 100,
      discountPercent: 20,
    },

    badges: {
      isNew: false,
    },

    images: {
      main: new URL(
        "../../assets/images/products/chairs/chair-03/chair-03-1.png",
        import.meta.url,
      ).href,
      gallery: [
        new URL(
          "../../assets/images/products/chairs/chair-03/chair-03-2.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-03/chair-03-3.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-03/chair-03-4.png",
          import.meta.url,
        ).href,
      ],
    },

    shortDescription: "Curved design",

    properties: {
      salesPackage: "1 Chair",
      modelNumber: "AUR-CHR-01",
      secondaryMaterial: "Metal",
      configuration: "Straight",
      fillingMaterial: "Foam",
      maximumLoadCapacity: "120 kg",
      originOfManufacture: "Serbia",
      dimensions: {
        width: "60 cm",
        height: "85 cm",
        depth: "55 cm",
        weight: "8 kg",
      },
      warrantySummary: "1 Year Manufacturer Warranty",
    },
  },
  {
    id: "p4",
    title: "Velora",
    category: "chair",

    price: {
      current: 160,
      original: null,
      discountPercent: 0,
    },

    badges: {
      isNew: false,
    },

    images: {
      main: new URL(
        "../../assets/images/products/chairs/chair-04/chair-04-1.png",
        import.meta.url,
      ).href,
      gallery: [
        new URL(
          "../../assets/images/products/chairs/chair-04/chair-04-2.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-04/chair-04-3.png",
          import.meta.url,
        ).href,
        new URL(
          "../../assets/images/products/chairs/chair-04/chair-04-4.png",
          import.meta.url,
        ).href,
      ],
    },

    shortDescription: "Modern elegance",

    properties: {
      salesPackage: "1 Chair",
      modelNumber: "AUR-CHR-01",
      secondaryMaterial: "Metal",
      configuration: "Straight",
      fillingMaterial: "Foam",
      maximumLoadCapacity: "120 kg",
      originOfManufacture: "Serbia",
      dimensions: {
        width: "60 cm",
        height: "85 cm",
        depth: "55 cm",
        weight: "8 kg",
      },
      warrantySummary: "1 Year Manufacturer Warranty",
    },
  },
];
