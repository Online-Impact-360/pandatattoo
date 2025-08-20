
import xss from "xss";

export function sanitizeSubmission(input) {
  const clean = (v) => (v ? xss(v, { whiteList: {} }).trim() : v);

  return {
    ...input,
    fullName: clean(input.fullName),
    phoneNumber: clean(input.phoneNumber),
    email: clean(input.email),
    instagram: clean(input.instagram),
    ageType: clean(input.ageType),
    gender: clean(input.gender),
    bodyPosition: clean(input.bodyPosition),
    bodyPositionImage: clean(input.bodyPositionImage),
    selectedPosition: clean(input.selectedPosition),
    size: clean(input.size),
    colorType: clean(input.colorType),
    tattooDescription: input.tattooDescription ? xss(input.tattooDescription, { whiteList: {} }) : undefined,
    availableDates: input.availableDates?.map((d) => clean(d)),
    schedule: clean(input.schedule),
    miamiStatus: clean(input.miamiStatus),
    scheduleType: clean(input.scheduleType),
    artistId: clean(input.artistId),
  };
}
