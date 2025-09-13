 <div className="bg-yellow">Hellooo</div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2rem"
      }}>
        
        <TextInput 
         ref={ref}
         value={value} 
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            console.log(ref.current?.value);
          }} type="text" placeholder="Enter text here" variant="small"/>
        <button onClick={() =>
          router.push(`/room/${value}`)
        }>Join Room</button>
      </div>