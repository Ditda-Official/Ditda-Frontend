const PaymentHistoryHeader = () => {
  return (
    <div className="border-b-gray-20 flex items-center justify-between border-b px-3 py-2">
      <p className="text-caption1-r text-gray-70">외주</p>
      <div className="flex items-center gap-16">
        <p className="text-caption1-r text-gray-70 w-14">금액 종류</p>
        <p className="text-caption1-r text-gray-70 w-25">금액</p>
      </div>
    </div>
  );
};

export default PaymentHistoryHeader;
