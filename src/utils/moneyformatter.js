export const moneyFormat = (number) => {

    const formatter = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2, // Show at least 2 decimal places
    });
  
    return formatter.format(number);
  }