export const sortByAge = (staffs) => {
    let sortedArr = [...staffs];
    sortedArr = staffs.sort((a, b) => b.age - a.age);
    return sortedArr;
}