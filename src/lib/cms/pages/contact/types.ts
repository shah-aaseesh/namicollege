// The Contact page text (WordPress: Contact → Page: …). Keys must match
// wordpress/snippets/16-contact.php.

export type ContactPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly masthead: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly emailLabel: string;
    readonly phoneLabel: string;
    readonly socialLabel: string;
  };
  readonly form: {
    readonly label: string;
    readonly title: string;
    /** {email} is replaced by the main email address. */
    readonly description: string;
    readonly nameLabel: string;
    readonly emailLabel: string;
    readonly phoneLabel: string;
    readonly topicLabel: string;
    readonly messageLabel: string;
    readonly topicPlaceholder: string;
    readonly topicGeneral: string;
    readonly topicOther: string;
    readonly submitLabel: string;
    readonly directPrompt: string;
    readonly successTitle: string;
    readonly successText: string;
  };
  readonly locations: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly hostsLabel: string;
    /** {area} is replaced by the campus area. */
    readonly mapNote: string;
  };
};
