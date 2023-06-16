package br.com.blue.prova.service;

import br.com.blue.prova.domain.Address;
import br.com.blue.prova.dto.PageableDTO;
import br.com.blue.prova.repository.AddressRepository;
import br.com.blue.prova.specification.AddressSpecification;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final AddressSpecification addressSpecification;

    public AddressService(AddressRepository addressRepository, AddressSpecification addressSpecification) {
        this.addressRepository = addressRepository;
        this.addressSpecification = addressSpecification;
    }

    @Transactional(readOnly = true)
    public Address findById(UUID addressId){
        return addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found!"));
    }

    @Transactional(readOnly = true)
    public Page<Address> findAll(String search, String street,
                                 String neighborhood, String houseNumber,
                                 String city, String zipCode,
                                 Boolean addressLead, PageableDTO pageableDTO){
        return addressRepository.findAll(
                addressSpecification.filter(search, street, neighborhood, houseNumber, city, zipCode, addressLead),
                pageableDTO.getPageable());
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private Address save(Address address){
        return addressRepository.save(address);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Address create(Address address){
        return this.save(new Address(address));
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Address update(Address address){
        var restoredAddress = this.findById(address.getId());

        restoredAddress.mergeForUpdate(address);

        return this.save(restoredAddress);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public Address delete(Address address){
        var restoredAddress = this.findById(address.getId());

        restoredAddress.setActiveAddress(false);

        return this.update(restoredAddress);
    }
}
