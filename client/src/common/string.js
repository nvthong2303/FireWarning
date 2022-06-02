export const collapseString = (text, value) => {
    let strCollapse = text;
    if (text?.length > 6) {
      strCollapse = text.slice(0, value) + '...';
    }
    return strCollapse;
};