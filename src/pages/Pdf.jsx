import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Define your styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    hospitalHeader: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#003366', // Dark blue color
        fontWeight: 'bold',
    },
    table: {
        display: 'table',
        width: 'auto',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#003366',
        backgroundColor: '#a6b1e1',
        borderStyle: 'solid',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#003366',
        padding: 5,
    },
    tableCell: {
        fontSize: 12,
        color: '#003366',
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#003366',
    },
    pillContainer: {
        marginBottom: 10,
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        backgroundColor: '#a6b1e1',
    },
    pillText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#444',
    },
    instructionText: {
        color: '#555',
        fontStyle: 'italic',
    },
    dateText: {
        textAlign: 'right',
        fontSize: 10,
        color: '#a6b1e1',
        marginBottom: 20,
    }
});

// Function to format the current date
const formatDate = (date) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	return new Date(date).toLocaleDateString(undefined, options)
}

function Pdf({ pills, patient }) {
	const currentDate = formatDate(new Date())

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.hospitalHeader}>Hospital Name</Text> {/* Hospital heading */}
                <Text style={styles.dateText}>Date: {currentDate}</Text> {/* Display the current date */}

                <View style={styles.section}>
                    <Text style={styles.header}>Patient Information</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Name</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{patient.name}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Email</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{patient.email}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>DOB</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{patient.dob}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Gender</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{patient.gender}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Blood Group</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{patient.bloodGroup}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.header}>Medications</Text>
                    {pills.map((item, index) => (
                        <View key={index} style={styles.pillContainer}>
                            <Text style={styles.pillText}>{item.drug}</Text>
                            <Text style={styles.pillText}>
                                {item.dosage}: {item.qty} {item.unit}
                                {parseInt(item.qty) > 1 ? 's' : ''}
                            </Text>
                            <Text style={styles.instructionText}>
                                {item.instruction.join(', ')}
                            </Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}

export default Pdf
