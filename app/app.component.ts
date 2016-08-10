import {Component} from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    login(): void {
        firebase.login({
            type: firebase.LoginType.ANONYMOUS
        }).then((user) => {
            alert("User uid: " + user.uid);
        }, (error) => {
            alert("Trouble in paradise: " + error);
        });
    }
    insertRecord(): void {
        console.log("insertRecord");
        firebase.push(
            '/users',
            {
                'first': 'Eddy',
                'last': 'Verbruggen',
                'birthYear': 1977,
                'isMale': true,
                'address': {
                    'street': 'foostreet',
                    'number': 123
                }
            }
        ).then(
            function (result) {
                console.log("created key: " + result.key);
            }
        );
    }

    getRecords(): void {
        console.log("getRecords");

        var onQueryEvent = function(result) {
            console.log("QUERY error: " + result.error);
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
            }
        };

        firebase.query(
            onQueryEvent,
            "/users",
            {
                // set this to true if you want to check if the value exists or just want the event to fire once
                // default false, so it listens continuously
                singleEvent: false,
                // order by company.country
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'country' // mandatory when type is 'child'
                    },
                    // but only companies named 'Telerik'
                    // (this range relates to the orderBy clause)
                    range: {
                        type: firebase.QueryRangeType.EQUAL_TO,
                        value: 'Bulgaria'
                    },
                    // only the first 2 matches
                    // (note that there's only 1 in this case anyway)
                    limit: {
                        type: firebase.QueryLimitType.LAST,
                        value: 2
                    }
            }
        );
    }
}
