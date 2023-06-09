package br.com.blue.prova.domain;

import javax.persistence.*;
import java.io.Serial;
import java.util.List;

@Entity
@Table(name = "professional")
public class Professional {
    @Serial
    private static final long serialVersionUID = 1L;

    private static final String SEQ_GENERATOR = "professional_id_seq_gen";
    private static final String SEQ_NAME = "professional_id_seq";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQ_GENERATOR)
    @SequenceGenerator(name = SEQ_GENERATOR, sequenceName = SEQ_NAME, allocationSize = 1)
    private Long id;

    @Column(name = "name")
    private String name;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "professional_departament",
            joinColumns = @JoinColumn(name = "professional_id"),
            inverseJoinColumns = @JoinColumn(name = "departament_id"))
    private List<Department> department;


}
