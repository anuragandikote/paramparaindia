export const getWhatsAppLink = ({
    phone = "917019713708",
    page,
    model,
    people,
    monthlyCost,
    savings
}) => {
    let message = "Hi Parampara India 👋";

    switch (page) {
        case "home":
            message +=
                "\nI visited your website and want to understand how wood gasifier stoves work.";
            break;

        case "products":
            message +=
                "\nI’m exploring your stove models and need help choosing the right one.";
            break;

        case "selector":
            message += `\nI cook for around ${people} people daily.\nYour website recommended the ${model} stove.\nCan you share pricing, fuel savings, and demo details?`;
            break;

        case "videos":
            message += `\nI watched your ${model} stove video.\nI’d like to know pricing and installation details.`;
            break;

        case "contact":
            message +=
                "\nI’d like to talk to someone regarding stove purchase and demo.";
            break;

        case "savings":
            message = `Hi Parampara India 👋
                I used your *Savings Calculator* on the website.

                My current monthly fuel spend is *₹${monthlyCost.toLocaleString()}*.
                It shows an estimated saving of *₹${savings.toLocaleString()} per month* with Parampara stoves.

                Please help me with:
                • Recommended stove model
                • Exact fuel savings
                • Price & demo details`;
            break;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
