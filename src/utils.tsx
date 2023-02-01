export const convertToTitleCase = ( str: string | undefined | null ): string => {
  // converts words to title case after spaces or slashes 
  return str ? str.toLowerCase().replace(/(^| |\/)(\w)/g, s => s.toUpperCase()) : ""
}

/**
 * Fn that lowercases and coverts space seperated text to dash separated text
 * @param {string} str
 * @returns {string } 
 */

export const seperateWithDashes = ( value: string | undefined): string => {
  return value?.toLowerCase().split(' ').join('-') || ''
}

/**
 * Fn that lowercases and coverts dash seperated text to space separated text
 * @param {string} str 
 * @returns {string } 
 */

//  export const seperateWitSspaces = ( value: string | undefined): string => {
//   return value?.toLowerCase().split('-').join(' ') 
// }


export const formattedPhoneNumber = ( phoneNumber: string): string => {
  // converts words to title case after spaces or slashes 
  return phoneNumber.toString().replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})/,`$1-$2-`)
}

/**
 * Truncate a string by a specified return length
 * Useful for account number displays
 * 
 * @param {string} text 
 * @param {number} returnLengthNumber 
 * @returns {string}
 */

export const truncateString = ( text: string, returnLengthNumber: number): string => {
  return text.substring(text.length - returnLengthNumber) 
}


/**
 * Subtracts number of years from a given date
 * 
 * @param {Date} dateObj 
 * @param { number } yearsToSubtract 
 * @returns { Date }
 */
export const substractYears = ( dateObj = new Date(),
yearsToSubtract = 0,): Date => {
 const newDateUTC = dateObj.setFullYear(
   dateObj.getFullYear() - yearsToSubtract,
 )
 return new Date(newDateUTC)
}