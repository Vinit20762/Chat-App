import { TextInput } from "@repo/ui/Text-input";

export default function Home() {
    return <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>
        <div>
        Chat Room
        </div>
        <div>
            <TextInput type="text" placeholder="Enter text here" variant="small" />
        </div>

    </div>;
}