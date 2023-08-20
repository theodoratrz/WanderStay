export type PropertySearchResult = {
    propertyId: number,
    title: string,
    description: string,
    imgId: number,
    numBeds: number,
    reviewsSummary: {
        reviewCount: number,
        avgStars: number,
    },
    pricePerNight: number,
    totalPrice: number
};
