using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Page
    {
        public string Name { get; }
        public string Description { get; }

        public Page(string name)
        {
            Name = name;
            Description =
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla auctor tellus, sit amet finibus ex placerat et. Pellentesque sed urna lobortis eros vulputate mollis. Suspendisse neque tortor, consectetur id magna rhoncus, aliquet porttitor sapien. Curabitur porta ante nunc, et tempor tellus mollis in. Ut volutpat consectetur quam vitae luctus. Donec volutpat tellus dapibus vulputate convallis. Aliquam euismod nulla eu dui mattis efficitur. In efficitur dignissim lorem eget maximus. Phasellus vitae pretium sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc diam libero, mollis a placerat sit amet, laoreet sit amet enim. Vestibulum ultrices vulputate congue." +
                "Nullam vel ipsum mauris. Praesent pharetra nec magna et fringilla. Etiam non aliquet nibh. Nullam pulvinar arcu purus, at semper ex elementum ac. Praesent massa velit, semper in mollis nec, tempus eget neque. Nullam vulputate libero eget dapibus cursus. Donec felis ligula, tincidunt vel finibus vel, lobortis at mi. Fusce sagittis odio ac eros malesuada, ac cursus ipsum laoreet." +
                "Integer fringilla auctor velit sit amet scelerisque.Curabitur vel varius purus. Pellentesque egestas nulla tellus, sed imperdiet nulla consectetur sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla vulputate lectus diam, in hendrerit est ultricies ut. Vestibulum consectetur finibus magna, sit amet pretium diam auctor faucibus.Vivamus arcu odio, blandit in enim sodales, sollicitudin porta justo. Integer rhoncus gravida tempor. Sed euismod turpis leo, vel porta ligula venenatis at. Proin imperdiet gravida magna, vitae porta sapien varius nec. Nam at placerat velit. Etiam laoreet purus id sem condimentum, ut vulputate ipsum tempor.Nunc venenatis est eget quam pharetra luctus.Aenean sed dui elit.";
        }
    }
}
