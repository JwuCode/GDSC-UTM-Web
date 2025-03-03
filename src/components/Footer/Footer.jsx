import './Footer.scss';

import { Box, ButtonGroup, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import bracket_colourless from '@/assets/graphics/bracket_colourless.svg';
import footerLinks from '@/data/footer.json';
import {
	CommunityDevButton,
	DiscordButton,
	EmailButton,
	FacebookButton,
	GitHubButton,
	InstagramButton,
	LinkedInButton,
	TwitterButton,
	YouTubeButton,
} from '@/data/SocialButton';
import { ErrorBoundary, Link } from '@/components';
import Image from 'next/image';

/**
 * A link for footer-flex. Takes the same props as "a".
 * @param {Object} props - props to pass to the link, same as "a" element
 *
 * @return {JSX.Element} Footer link
 */
const FooterLink = styled((props) => (
	<li>
		<Link className={'link'} sx={{ color: 'inherit' }} {...props} />
	</li>
))(({ theme }) => ({
	color: theme.palette.text.secondary,
	opacity: 0.7,
	'&:hover': {
		opacity: 1,
	},
}));

/**
 * @returns {JSX.Element} Footer component
 */
export const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: (theme) => theme.palette.action.hover,
				borderColor: (theme) => theme.palette.divider,
			}}
		>
			<Container maxWidth="xl">
				<div id="footer">
					<h2 className="logo-group flex-item">
						<Link href="/">
							<Image
								src={bracket_colourless}
								className="logo"
								height="64"
								width="64"
								draggable="false"
								alt="Footer"
							/>
						</Link>
					</h2>

					<div className="footer-flex">
						<ErrorBoundary>
							{
								/* iterate through top level keys in footerLinks
								 * must only iterate through keys as forEach does not return anything
								 * and thus cannot be used for react purposes
								 * key name is used as the header text */
								Object.keys(footerLinks).map(function (header) {
									return (
										<div className="flex-item links-flex" key={header}>
											<Typography variant="h6" component="h2">
												{header}
											</Typography>
											<ul>
												{Object.keys(footerLinks[header]).map(function (link) {
													return (
														<FooterLink
															key={link}
															href={footerLinks[header][link].URL}
															external={footerLinks[header][link].external}
														>
															{link}
														</FooterLink>
													);
												})}
											</ul>
										</div>
									);
								})
							}
						</ErrorBoundary>
					</div>
				</div>

				<div className="footer-text">
					<ul className="links-flex" style={{ paddingTop: '1em', flexGrow: 1 }}>
						<FooterLink
							className="link"
							href="https://github.com/utmgdsc/website/issues/new/choose"
							external
						>
							Improve this page on GitHub
						</FooterLink>
					</ul>
					<ButtonGroup className={'flex-item'} id="social">
						<CommunityDevButton />
						<InstagramButton />
						<GitHubButton />
						<TwitterButton />
						<FacebookButton />
						<LinkedInButton />
						<YouTubeButton />
						<EmailButton />
						<DiscordButton />
					</ButtonGroup>
				</div>
			</Container>
		</Box>
	);
};
