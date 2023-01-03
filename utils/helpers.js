module.exports = {

    format_time: (date) => {
      return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
      ].join('/');
    },
    
};