const program =
`struct VertexInput {
	position: vec4,
    color: vec4,
}

struct VertexOutput {
    position: vec4,
    color: vec4,
}

fn vertex_main(in: VertexInput) -> VertexOutput {
    return VertexOutput {
        position: in.position,
        color:    in.color,
    };
}

program VertexColored {
    stage vertex(in: VertexInput) -> VertexOutput {
        return vertex_main(in);
    }

    stage fragment(in: VertexOutput) -> vec4 {
        return in.color;
    }
}`;

export {program};