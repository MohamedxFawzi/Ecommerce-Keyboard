import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NimbusKeyboards`.
 */
export type NimbusKeyboardsProps = SliceComponentProps<Content.NimbusKeyboardsSlice>;

/**
 * Component for "NimbusKeyboards" Slices.
 */
const NimbusKeyboards: FC<NimbusKeyboardsProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			Placeholder component for {slice.slice_type} (variation: {slice.variation}) slices.
			<br />
			<strong>You can edit this slice directly in your code editor.</strong>
		</section>
	)
};

export default NimbusKeyboards