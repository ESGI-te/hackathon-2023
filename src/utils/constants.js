export const BREAKPOINTS = {
	TABLET_MIN: 600,
	DESKTOP_MIN: 900,
	DESKTOP_LARGE_MIN: 1200,
};

export const MEDIA_QUERIES = {
	MOBILE: `@media (max-width: ${BREAKPOINTS.TABLET_MIN / 16}rem)`,
	TABLET_AND_UP: `@media (min-width: ${BREAKPOINTS.TABLET_MIN / 16}rem)`,
	DESKTOP_AND_UP: `@media (min-width: ${BREAKPOINTS.DESKTOP_MIN / 16}rem)`,
	DESKTOP_LARGE_AND_UP: `@media (min-width: ${
		BREAKPOINTS.DESKTOP_LARGE_MIN / 16
	}rem)`,
};
