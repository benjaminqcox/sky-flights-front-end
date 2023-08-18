import Booking from "../components/Bookings";

describe(`Booking test suite`, () => {
    test(`it should render no bookings shown when the user hasn't selected any bookings`, async () => {
        const testTodo = new Booking();
        const testRenderer = create(<Booking/>);
        const testInstance = testRenderer.root;
    
        const bookingDiv = testInstance.findByProps({  name: "div-bookings" });
        const noBookingsDesc = testInstance.findByProps({ name: "no-bookings-found" });

        // Outer booking div parent is empty without any children
        expect(bookingDiv).toBeEmpty();

        // Rendering no bookings description 
        expect(noBookingsDesc).toBeInTheDocument();
    })

    test(`it should delete a selected booking when the cancel booking button is pressed`, async () => {
        const bookingID = 3;
        const testRenderer = create(<Booking/>);
        const testInstance = testRenderer.root;
        
        const bookingDiv = testInstance.findByProps({name: `div - ${bookingID}`})
        const cancelButton = testInstance.findByProps({name: `cancelBooking - ${bookingID}`})

        // Click on the cancel booking button passing in a booking ID of 3
        await act(() => cancelButton.props.onClick({ target : { value: 3 } } ));
        
        // Booking div should be removed from the page
        expect(bookingDiv).toBeNull();
    })

    test(`it should render two divs if returnFlight is true`, async () => {
        const testTodo = new Booking();
        const testRenderer = create(<Booking />);
        const testInstance = testRenderer.root;

        
    });
})