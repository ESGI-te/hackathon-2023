import { useCallback, useEffect, useState } from "react";
import { BREAKPOINTS } from "@utils/constants";

export const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [isDesktopLarge, setIsDesktopLarge] = useState(false);

	const handleWindowResize = useCallback(() => {
		const { innerWidth } = window;

		setIsMobile(innerWidth < BREAKPOINTS.TABLET_MIN);
		setIsTablet(innerWidth >= BREAKPOINTS.TABLET_MIN);
		setIsDesktop(innerWidth >= BREAKPOINTS.DESKTOP_MIN);
		setIsDesktopLarge(innerWidth >= BREAKPOINTS.DESKTOP_LARGE_MIN);
	}, []);

	useEffect(() => {
		handleWindowResize();

		window.addEventListener("resize", handleWindowResize);

		return () => window.removeEventListener("resize", handleWindowResize);
	}, [handleWindowResize]);

	return { isMobile, isTablet, isDesktop, isDesktopLarge };
};
