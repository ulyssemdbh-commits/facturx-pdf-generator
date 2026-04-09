const fs = require('fs');
const { JSDOM } = require('jsdom');

function generateFacturX(invoiceData) {
    const xmlTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
    <ram:HeaderExchangedDocument>
        <ram:ID>${invoiceData.id}</ram:ID>
        <ram:Name>${invoiceData.name}</ram:Name>
        <ram:TypeCode>380</ram:TypeCode>
    </ram:HeaderExchangedDocument>
    <ram:SupplyChainTradeTransaction>
        <ram:ApplicableHeaderTradeAgreement>
            <ram:BuyerReference>${invoiceData.buyerReference}</ram:BuyerReference>
        </ram:ApplicableHeaderTradeAgreement>
        <ram:ApplicableHeaderTradeDelivery>
            <ram:ActualDeliverySupplyChainEvent>
                <ram:OccurrenceDateTime>
                    <udt:DateTimeString format="102">${invoiceData.deliveryDate}</udt:DateTimeString>
                </ram:OccurrenceDateTime>
            </ram:ActualDeliverySupplyChainEvent>
        </ram:ApplicableHeaderTradeDelivery>
    </ram:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

    fs.writeFileSync('factur-x.xml', xmlTemplate);
    console.log('XML CII Factur-X file generated.');
}

module.exports = generateFacturX;
