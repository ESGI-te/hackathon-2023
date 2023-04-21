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

export const FORMATION_DIFFICULTIES = {
	EASY: "easy",
	NORMAL: "normal",
	HARD: "hard",
};

export const FORMATION_DIFFICULTIES_NAMES = {
	[FORMATION_DIFFICULTIES.EASY]: "Facile",
	[FORMATION_DIFFICULTIES.NORMAL]: "Intermédiaire",
	[FORMATION_DIFFICULTIES.HARD]: "Avancé",
};
