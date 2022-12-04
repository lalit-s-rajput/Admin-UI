# Admin-UI
Geektrust project (https://www.geektrust.com/coding/detailed/admin-ui)

Workable UI with following functionalities:
1. Column titles must stand out from the entries. <br />
2. There should be a search bar that can filter on any property. <br />
3. You should be able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.) <br />
4. You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. Pagination must update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3. <br />
5. You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left. <br />
6. Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed in the current page, and not all 50 rows. <br />

## Endpoint : <br/>
https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json <br/>

![image](https://user-images.githubusercontent.com/67156745/205485831-17edcdcd-14b0-4adc-9955-261d49a256b1.png)

![image](https://user-images.githubusercontent.com/67156745/205485851-1e96e2cf-38c7-4f2b-be84-c06ca4dca449.png)
![image](https://user-images.githubusercontent.com/67156745/205485865-4c293008-01c6-44fa-8862-984559a8101c.png)
![image](https://user-images.githubusercontent.com/67156745/205485892-02c0e9c7-8b06-4b24-89a2-4e5125114c4d.png)

