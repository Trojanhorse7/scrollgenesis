import React from "react";
import Faq from "react-faq-component";
import "./Faqs.css"

const data = {
	title: "FAQ",
	rows: [
		{
			"title": "What is Scroll Genesis?",
			"content": "Scroll Genesis is a crowdfunding platform powered by the Scroll protocol, offering decentralized fundraising for creators and a transparent experience for backers."
		},
		{
			"title": "How does Scroll Genesis work?",
			"content": `Scroll Genesis uses smart contracts on Scroll to enable creators to launch projects, set funding goals, and offer rewards. Backers contribute funds directly through the platform, and once the goal is reached, funds are released to the creator.`
		},
		{
			"title": "Why choose Scroll Genesis over traditional platforms?",
			"content": "Scroll Genesis offers transparency, security, and advanced features through its integration with Scroll, providing a decentralized crowdfunding experience."
		},
		{
			"title": "How secure is Scroll Genesis?",
			"content": `Scroll Genesis prioritizes security by utilizing smart contracts and blockchain technology, minimizing the risk of fraud or misappropriation.`
		},
		{
			"title": "Can anyone launch a project on Scroll Genesis?",
			"content": `Scroll Genesis welcomes creators from diverse domains, providing an inclusive platform for entrepreneurs and individuals to showcase their projects and raise funds.`
		},
		{
			"title": "How can I become a backer on Scroll Genesis?",
			"content": `To back a project on Scroll Genesis, simply browse available projects, choose the ones you wish to support, and contribute funds through the user-friendly interface.`
		},
		{
			"title": "What happens if a project doesn't reach its funding goal?",
			"content": `If a project doesn't reach its funding goal within the specified timeframe, the funds are not released, and backers' contributions are typically returned.`
		},
		{
			"title": "How can I contact Scroll Genesis' support team?",
			"content": `For inquiries or assistance, reach out to Scroll Genesis' support team through the contact page on the website. They are ready to address any questions or concerns you may have.`
		}
	],
};

const styles = {
	bgColor: "#2E443B",
	titleTextColor: "#BBF7D0",
	rowTitleColor: "#BBF7D0",
	rowContentColor: "grey",
	arrowColor: "#BBF7D0",
	rowTitleTextSize: "large",
	titleTextSize: "4rem",
};

const config = {
    animate: true,
    tabFocus: true,
    expandIcon: "+",
    collapseIcon: "-",
};


const Faqs = () => {

    return (
        <div className="faqs-wrapper">
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    )
}

export default Faqs ;