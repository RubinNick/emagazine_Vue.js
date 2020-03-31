import { api } from '../apiService';

export default class PaymentService {

    createToken(card, cardholderName) {
        return stripe.createToken(card, { name: cardholderName });
    };

    intentRequest(amount) {
        return api.get(`/Payments/CreateIntent/${amount}`);
    }

    async processCheckout(clientSecret, card, cardholderName) {
        const checkout = await stripe.handleCardPayment(
            clientSecret, card, {
                source_data: {
                    owner: {name: cardholderName}
                }
            }
        );

        return checkout;
    };

}